import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Button} from 'react-native';
// import {Button} from 'react-native-elements';
import t from 'tcomb-form-native';

import { Auth, graphqlOperation, API,Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { createRecording } from '../src/graphql/mutations';

Amplify.configure(awsconfig);

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
// price: t.Number,
  date: t.String,
  description: t.String,
});

const AddProductScreen = ({navigation}) => {
  const [form, setForm] = useState(null); 
  const [initialValues, setInitialValues] = useState({});
  const options = {
    auto: 'placeholders',
    fields: {
      description: {
        multiLine: true,
        stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 100,
              textAlignVertical: 'top',
            },
          },
        },
      },
    },
  };
  const handleSubmit = async () => {
    try {
      const value = await form.getValue();
      console.log('value: ', value);
      const user = await Auth.currentAuthenticatedUser();
      console.log(user)
    //   if (photo) {
    //     const response = await fetch(photo.uri);
    //     const blob = await response.blob();
    //     console.log('FileName: \n');
    //     await Storage.put(photo.fileName, blob, {
    //       contentType: 'image/jpeg',
    //     });
    //   }
      const response = await API.graphql( 
        graphqlOperation(createRecording, {
          input: {
            name: value.name,
            // price: value.price.toFixed(2),
            date: value.date,
            description: value.description,
            // userId: user.attributes.sub,
            // userName: user.username,
            // image: photo.fileName,
            // image:'tof'
          },
        }),
      );
      console.log('Response :\n');
      console.log(response);
    //   navigation.navigate('Home');
    } catch (e) {
      console.log(e.message);
    }
  };
return (
    <>
      <SafeAreaView style={styles.addProductView}>
        <ScrollView>
          <Form
            ref={(c) => setForm(c)}
            value={initialValues}
            type={User}
            options={options}
          />
          <Button title="Save" onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  addProductView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 15,
    height: 'auto',
  },
});
export default AddProductScreen;