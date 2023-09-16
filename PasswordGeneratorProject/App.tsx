/* eslint-disable prettier/prettier */
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';


  const PasswordSchema = Yup.object().shape({
    PasswordLength:Yup.number()
    .min(4,'should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('Length is required')
  });

  export default function App() {

  const [Password,setPassword] = useState('')
  const [Passgenerated,setPassgenerated] = useState(false)

  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,setUpperCase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)


  const genratedPasswordString = (PasswordLength:number)=>{
    let charactersList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
    charactersList += upperCaseChars;
    }
    if (lowerCase) {
    charactersList += lowerCaseChars;
    }
    if (numbers) {
    charactersList += digitChars;
    }
    if (symbols) {
    charactersList += specialChars;
    }

    const PasswordResult = createPassword(charactersList,PasswordLength);

    setPassword(PasswordResult);
    setPassgenerated(true);

  };

  const createPassword = (characters:string , PasswordLength:number)=>{
    let result = ''

    for (let i = 0; i < PasswordLength; i++ ){
    const characterIndex = Math.round(Math.random() * characters.length)
    result += characters.charAt(characterIndex)
    }
    return result;
  };

  const resetPasswordState = ()=>{
    setPassword('');
    setPassgenerated(false);
    setLowerCase(false);
    setNumbers(false);
    setSymbols(false);
    setUpperCase(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            <Formik
              initialValues={{ PasswordLength: '' }}
              validationSchema={PasswordSchema}
              onSubmit={ values => {
              genratedPasswordString(+values.PasswordLength)
              }}
              >

              {({values, errors, touched, isValid, handleChange, handleSubmit, handleReset}) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.PasswordLength && errors.PasswordLength && (
                  <Text style={styles.errorText}>
                  {errors.PasswordLength}
                  </Text>
                  )}
                </View>
                  <TextInput
                  style={styles.inputStyle}
                  value={values.PasswordLength}
                  onChangeText={handleChange('PasswordLength')}
                  placeholder="Ex. 8"
                  keyboardType='numeric'
                  />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include lowercase</Text>
                <BouncyCheckbox
                disableBuiltInState
                isChecked={lowerCase}
                onPress={()=>setLowerCase (!lowerCase)}
                fillColor='#009FE8'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include upperCase</Text>
                <BouncyCheckbox
                disableBuiltInState
                isChecked={upperCase}
                onPress={()=>setUpperCase (!upperCase)}
                fillColor='#009FE8'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include numbers</Text>
                <BouncyCheckbox
                disableBuiltInState
                isChecked={numbers}
                onPress={()=>setNumbers (!numbers)}
                fillColor='#009FE8'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include symbols</Text>
                <BouncyCheckbox
                disableBuiltInState
                isChecked={symbols}
                onPress={()=>setSymbols (!symbols)}
                fillColor='#009FE8'
                />
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity
                disabled={!isValid}
                style={styles.primaryBtn}
                onPress={handleSubmit}>
                  <Text style={styles.primaryBtnTxt}> Generator Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={()=> {
                handleReset();
                resetPasswordState();}}>
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
            )}
            </Formik>
          </View>
        {Passgenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press To Copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{Password}</Text>
          </View>
        ) : null}
        <View style={styles.by} >
          <Text  style={styles.bytext}>By Abderahmane Kateb</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  )};

  const styles = StyleSheet.create({

  appContainer: {
  flex: 1,
  },
  formContainer: {
  margin: 8,
  padding: 8,
  },
  title: {
  fontSize: 32,
  fontWeight: '600',
  marginBottom: 15,
  },
  subTitle: {
  fontSize: 26,
  fontWeight: '600',
  marginBottom: 2,
  },
  description: {
  color: '#000',
  marginBottom: 8,
  },
  heading: {
  fontSize: 15,
  },
  inputWrapper: {
  marginBottom: 15,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  },
  inputColumn: {
  flexDirection: 'column',
  },
  inputStyle: {
  padding: 8,
  width: '30%',
  borderWidth: 1,
  borderRadius: 4,
  borderColor: '#16213e',
  },
  errorText: {
  fontSize: 12,
  color: '#ff0d10',
  },
  formActions: {
  flexDirection: 'row',
  justifyContent: 'center',
  },
  primaryBtn: {
  width: 120,
  padding: 10,
  borderRadius: 8,
  marginHorizontal: 8,
  backgroundColor: '#009FE8',
  },
  primaryBtnTxt: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: '700',
  },
  secondaryBtn: {
  width: 120,
  padding: 17,
  borderRadius: 8,
  marginHorizontal: 8,
  backgroundColor: '#CAD5E2',


  },
  secondaryBtnTxt: {
  textAlign: 'center',
  fontSize:15,
  fontWeight:'500'
  },
  card: {
  padding: 12,
  borderRadius: 6,
  marginHorizontal: 12,
  },
  cardElevated: {
  backgroundColor: '#CAD5E2',
  elevation: 1,
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowColor: '#333',
  shadowOpacity: 0.2,
  shadowRadius: 2,
  },
  generatedPassword: {
  fontSize: 22,
  textAlign: 'center',
  marginBottom: 12,
  color:'#000'
  },
  by:{
  paddingHorizontal:15,
  },
  bytext:{},
  });
