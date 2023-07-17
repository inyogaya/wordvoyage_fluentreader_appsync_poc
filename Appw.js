




import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "./App";
import ForgotPassword from "./screens/forgotPassword";
import ForgotPassword2 from "./screens/forgotPassword2";
import ForgotPassword3 from "./screens/forgotPassword3";
// import forgotPassword3 from "./screens/forgotPassword3";
import Login from "./screens/Login";


// import VoiceRecorder from "./screens/VoiceRecorder";



const Stack = createNativeStackNavigator();

export default function Appw() { 
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      
      <Stack.Screen 
          name="login"
          component={Login}
          options={{headerShown: false}}
        />

<Stack.Screen 
          name="app"
          component={App}
          options={{headerShown: false}}
        />

        
   <Stack.Screen 
          name="f"
          component={ForgotPassword}

          options={{headerShown: false}}
        />

<Stack.Screen 
          name="f2"
          component={ForgotPassword2}
          
          options={{headerShown: false}}
        />

<Stack.Screen 
          name="f3"
          component={ForgotPassword3}
          
          options={{headerShown: false}}
        />

       

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}