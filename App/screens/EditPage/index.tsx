import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import addItem from '../../utils/addItem';
import {StackNavigatorParamList} from '../../types';
import DeleteModal from '../../components/DeleteModal';

import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckboxIcon = require('../../assets/icon/checkbox_check.png');
const CloseIcon = require('../../assets/icon/ic_close.png');

const EditPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>();
  const route = useRoute<RouteProp<StackNavigatorParamList, 'edit'>>().params;
  // 모달 스위치
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  // 체크, 날짜, 제목입력
  const [check, setCheck] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [titleValue, setTitleValue] = useState('');
  // 태그 입력
  const [tagValue, setTagValue] = useState('');
  const [tagArray, setTagArray] = useState<String[]>([]);
  // 삭제 ID
  const [idCount, setIdCount] = useState(0);

  const tagDeleteHandler = (item: String) => {
    setTagArray(tagArray.filter(el => el !== item));
  };

  const getData = async () => {
    await AsyncStorage.getAllKeys().then(keys => {
      if (keys.length > 0) {
        const maxKey = keys.reduce((previous, current) => {
          return Number(previous) > Number(current) ? previous : current;
        });
        setIdCount(Number(maxKey));
      }
    });
  };

  const removeItemHandler = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return navigation.goBack();
    } catch (exception) {
      return false;
    }
  };

  const addItemHandler = async () => {
    if (titleValue === '') {
      setConfirmModalVisible(true);
    } else {
      const newTodos = {
        id: route !== undefined ? route.id : idCount + 1,
        check: check,
        date: selectDate,
        title: titleValue,
        tag: tagArray,
      };

      await addItem(`${newTodos.id}`, newTodos);
      navigation.goBack();
    }
  };

  useEffect(() => {
    getData();
    if (route !== undefined) {
      setTagArray(route.tag);
      setCheck(route.check);
      setSelectDate(route.date);
      setTitleValue(route.title);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={() => {
          addItemHandler();
        }}
        onDatePress={() => setDateModalVisible(true)}
        onDeletePress={() => setDeleteModalVisible(true)}
        selectDate={selectDate}
        edit={route !== undefined}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentsWrap}>
          <View style={styles.flexRow}>
            <Pressable onPress={() => setCheck(prev => !prev)}>
              {check ? (
                <Image source={CheckboxIcon} style={styles.checkbox} />
              ) : (
                <View style={[styles.checkbox, styles.noneCheck]} />
              )}
            </Pressable>
            <TextInput
              style={styles.contentsTitle}
              placeholder="제목"
              value={titleValue}
              onChangeText={setTitleValue}
              textAlignVertical="top"
              autoFocus
            />
          </View>
          <View style={styles.tagWrap}>
            <Pressable
              style={styles.tag}
              onPress={() => setTagModalVisible(true)}>
              <Text style={styles.tagText}>태그추가</Text>
            </Pressable>

            {tagArray.map((item, index) => {
              return (
                <View style={[styles.tag, styles.flexRow]} key={index}>
                  <Text>{item}</Text>
                  <Pressable
                    onPress={() => {
                      tagDeleteHandler(item);
                    }}>
                    <Image source={CloseIcon} style={styles.closeIconBox} />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* 캘린더 모달 */}
      <Modal isVisible={dateModalVisible}>
        <Calendar
          onDayPress={day => {
            setDateModalVisible(false);
            setSelectDate(day.dateString);
          }}
          style={styles.calendarStyle}
        />
      </Modal>
      {/* 삭제확인 모달 */}
      <DeleteModal
        isVisible={deleteModalVisible}
        onCancelPress={() => setDeleteModalVisible(false)}
        onDeletePress={() => {
          if (route !== undefined) {
            removeItemHandler(route.id.toString());
          }
          setDeleteModalVisible(false);
        }}
      />
      {/* 태그입력 모달 */}
      <Modal isVisible={tagModalVisible} avoidKeyboard>
        <View style={styles.modalWrap}>
          <TextInput
            value={tagValue}
            onChangeText={setTagValue}
            style={styles.tagInput}
            textAlign="center"
            placeholder="태그를 입력해주세요."
            autoFocus
          />
          <View style={styles.modalButtonWrap}>
            <Pressable
              style={[styles.modalButton, styles.modalTransparentButton]}
              onPress={() => {
                setTagModalVisible(false);
                setTagValue('');
              }}>
              <Text>취소</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.modalTransparentButton]}
              onPress={() => {
                setTagModalVisible(false);
                if (tagValue !== '') {
                  setTagArray(prev => [...prev, tagValue]);
                }
                setTagValue('');
              }}>
              <Text>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* 제목 입력 모달 */}
      <Modal isVisible={confirmModalVisible}>
        <View style={styles.modalWrap}>
          <Text>제목을 입력해주세요.</Text>
          <View style={styles.modalButtonWrap}>
            <Pressable
              style={[styles.modalButton, styles.modalTransparentButton]}
              onPress={() => {
                setConfirmModalVisible(false);
              }}>
              <Text>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditPage;
