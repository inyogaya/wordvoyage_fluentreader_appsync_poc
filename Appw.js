




import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "./App";
// import LastReadBlock from "./components/LastReadBlock";
import ForgotPassword from "./screens/ForgotPassword";
import ForgotPassword2 from "./screens/ForgotPassword2";
import ForgotPassword3 from "./screens/ForgotPassword3";
// import forgotPassword3 from "./screens/forgotPassword3";
import Login from "./screens/Login";
// import Bookshelves from "./screens/BookShelves";
// import UtteranceBox from "./components/UtteranceBox";
// import BookProgress from "./components/BookProgress";
// import BlockCompare from "./components/BlockCompare";
// import CleanAppStorage from "./components/CleanAppStorage";
// import BookSentencesRead from "./components/BookSentencesRead";
import Profile from "./screens/Profile";
import Record from "./screens/Record";
// import Rec from "./screens/Rec";
// import Record from "./screens/Record";
// Record

// import UtterancesDisplay from "./components/UtterancesDisplay"

// import VoiceRecorder from "./screens/VoiceRecorder";



const Stack = createNativeStackNavigator();

export default function Appw() {

  return (
    <NavigationContainer>
      <Stack.Navigator>


        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
{/* <Stack.Screen
          name="rec"
          component={Record}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="app"
          component={App}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="rec"
          component={Record}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="f"
          component={ForgotPassword}

          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="f2"
          component={ForgotPassword2}

          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="f3"
          component={ForgotPassword3}

          options={{ headerShown: false }}
        />

        {/*  */}

        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen 
          name="lastreadblock"
          component={LastReadBlock}
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="bookshelves"
          component={Bookshelves}
          options={{headerShown: false}}
        />  */}
        {/* <Stack.Screen 
          name="iam"
          component={IAm}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Third"
          component={ThirdScreen}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen 
          name="Utterances"
          component={UtteranceBox}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="delimitSentences"
          component={BookSentencesRead}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="readSentences"
          component={UtterancesDisplay}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen 
          name="readSentences"
          component={UtterancesDisplay}
          options={{headerShown: false}}
        />
           <Stack.Screen 
          name="saveChapter"
          component={Save}
          options={{headerShown: false}}
        />
             <Stack.Screen 
          name="compare"
          component={BookContent}
          options={{headerShown: false}}
        />
           <Stack.Screen 
          name="cleanStorage"
          component={CleanAppStorage}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen 
          name="blockCompare"
          component={BlockCompare}
          options={{headerShown: false}}
        /> */}
        {/*        
         <Stack.Screen 
          name="progress"
          component={BookProgress}
          options={{headerShown: false}}
        /> */}


      </Stack.Navigator>
    </NavigationContainer>
  );
}