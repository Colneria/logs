import React from 'react';
import { StyleSheet,
   Text,
    View,
    ScrollView,
    FlatList,
    StatusBar,
    Platform,
  TouchableOpacity,
 AsyncStorage,//辞書型で文字列が保存ができる物mono
 filterText,
 KeyboardAvoidingView
} from 'react-native';

import {SearchBar,Input,Button,ListItem}from "react-native-elements"
import Icon from 'react-native-vector-icons/Feather';
import CheackIcon from "react-native-vector-icons/MaterialIcons"

  const StatusBarHeight = Platform.OS === 'ios' ? 20:StatusBar.currentHeight;
  //AsyncStrageに保存する用のキー
  const LOGS ="@LogsApp:logsList"
  
  // const storage = new Storage({
  //   storageBackend: AsyncStorage
  // })

  const LogsItem = (props) => {
    let textStyle = styles.LogsItem;

    let icon = null;
    if(props.done === true){
      icon = <CheackIcon name="done"/>//チェックマーク
      textStyle = styles.LogsItemDone
    }
    return(
       <TouchableOpacity
        onPress={props.tapLogsItem} //ここにリスト短く押した時にtapTodoItemの処理を実行するように書いている
        onLongPress={props.deleteLogs}>
        <ListItem
          title={props.title}
          rightIcon={icon}//チェックアイコン
          bottomDivider//下線
          titleStyle={textStyle}
          /> 
          <Text style={styles.LogsItem}> {props.title}</Text> 
       </TouchableOpacity>
     )
    }






//ここらへん参考になる
export default class LogsApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      logsList:[],
      currentIndex:0,
      inputText:"",
      filterText:"",
    }
  }

 async componentDidMount(){
    this.loadLogs();
  }

  
  loadLogs= async() => {
    try{
      let LogsString = await AsyncStorage.getItem(LOGS);
       if(LogsString){

    
         let logsList = JSON.parse(LogsString);
         let currentIndex = logsList.length;
         this.setState({
            logsList: logsList,
            currentIndex: currentIndex
    });
    }
  }catch(e){
    console.log(e)
  }
  }




  addLogs = () => {
    let title = this.state.inputText;
    if(title === ""){
      return
    }
    let index = this.state.currentIndex +1;
    let newLogs = {index: index, title: title, done:false};
    let logsList = [...this.state.logsList,newLogs];//ES6のスプレッド構文
    this.setState({
      logsList:logsList,
      currentIndex:index,
      inputText: "",
    });
    //Asyncstrageに保存
    this.saveLogs(logsList)
  }




  
  //asyncの保存する処理
  saveLogs = async(logsList) => {
    try{
         //logsListをJSONの形に変換
         let LogsString = JSON.stringify(logsList);
         //ここで保存を行う
         await AsyncStorage.setItem(LOGS,LogsString);//awaitはbreakみたいに処理を終わらせてあげるもの
    }catch(e){//tryが失敗した場合実行 elseぶんのようなもの
    console.log(e);//デバック用にエラーを吐くように
    }
  }
  


  
  tapLogsItem= (LogsItem) => {
    let logsList = this.state.logsList;
    let index = logsList.indexOf(LogsItem);
    LogsItem.done = !LogsItem.done;
    logsList[index] = LogsItem;
    this.setState({logsList: logsList});
    this.saveLogs(logsList);
  }

  deleteLogs = (LogsItem) => {
    let logsList = this.state.logsList;
    let index = logsList.indexOf(LogsItem);
    logsList.splice(index ,1);
    this.setState({logsList: logsList});
    this.saveLogs(logsList);
  }
  
  render (){
    const filterText = this.state.filterText;
    let logsList = this.state.logsList;
    if(filterText !==""){
      logsList = logsList.filter(t => t.title.includes(filterText));
    }

    const platform = Platform.OS === 'ios' ? 'ios' : 'android';
    

    return(//一個のreturnに対してviewは１つ
    //   <KeyboardAvoidingView style={styles.container}  behavior="padding">
      
    //   <SearchBar
    //    onChangeText={(text) => this.setState({filterText: text})}
    //    value={this.state.filterText}
    //    placeholder="Logs検索"
    //    onClear={()=> this.setState({filterText:""})}
    //    cancelButtonTitle="キャンセル"
    //    platform={platform}
    //  />



      <View style={styles.container}>
        
        
              <Button
              onPress={() => this.props.navigation.navigate('timer') }//kore?
              >
                  <Text>タイマー</Text>
              </Button>
           <View style={styles.pagetitle}>
              <Text>LOGS</Text>
           </View>
      
     <ScrollView style={styles.logsList}>
     <FlatList
       data={logsList}
       extraData={this.state}
       renderItem={({ item }) => 
         <LogsItem
         title={item.title}
         done={item.done}
         tapLogsItem={() => this.tapLogsItem(item)}
         deleteLogs={()=> this.deleteLogs(item)}
         />
      }
      keyExtractor={(item, index) => "Logs_"+item.index}
      />
      </ScrollView>
     
     
    {/* //  <View style={styles.input}>
    //      <Input */}
    {/* //        style={styles.inputText}
    //        onChangeText={(text) => this.setState({inputText: text})}
    //        value={this.state.inputText}
    //      />
    //      <Button */}
    {/* //      onPress={this.addLogs}
    //         title=""
    //         color="#C69C6C"
    //          icon={ */}
    {/* //        <Icon
    //         name="plus"
    //         size={30}
    //         color="fff"
    //        />
    //       }
    //        buttonStyle={styles.inputButton}
    //      />
    //    </View>
    //   </KeyboardAvoidingView>  */}

    </View>
    )
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    //justifyContent: 'center',
    paddingTop:StatusBarHeight,
  

    //ステータスバーの高さだけ下にずらす
  },
  filter: {
    height:50,
    margin:10,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#c7c7c7",

  },
  input:{
    height:50,
    margin:10,
    // borderBottomWidth:1,
    // borderColor:"#c7c7c7",
    flexDirection:"row",
    alignItems:"center",
    paddingRight:60
  },
  inputText:{
    flex:5,
    padding:10,
  },
  logsList: {
    flex:1,

  },
  LogsItem: {
    fontSize: 20,
    lineHeight: 30,
  },
  // todoItemWrap: {
  //   padding: 10,
  //   backgroundColor: "#fff",
  //   borderBottomWidth:1,
  //   borderColor: "#c7c7c7",
  // },
  // todoItemDoneWrap: {
  //   padding: 10,
  //   backgroundColor: "#c7c7c7",
  //   borderBottomWidth:1,
  //   borderColor: "#c7c7c7",
  // },
  LogsItemDone: {
    fontSize: 20,
    lineHeight: 30,
  },
  inputButton: {
    width: 48,
    height: 48,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 48,
    backgroundColor: "#C69C6C",
  },
  topbar:{
    backgroundColor:"#bac9cc",
    height:30,
    
  },
  back:{
    width:100,
  },

  pagetitle:{
    width:400,
  }
  

  
 
});