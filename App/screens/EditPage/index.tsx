import React, {useState} from 'react';
import {SafeAreaView, View, Text, Pressable, Image} from 'react-native';
import styles from './style';
import Header from '../../components/Header';

import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';

const CheckboxIcon = require('../../assets/icon/checkbox_check.png');

const EditPage = () => {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  return (
    <SafeAreaView>
      <Header
        onDatePress={() => setDateModalVisible(true)}
        onDeletePress={() => setDeleteModalVisible(true)}
        selectDate={selectDate}
      />

      <View style={styles.contentsWrap}>
        <View style={styles.flexRow}>
          <Pressable onPress={() => setCheck(prev => !prev)}>
            {check ? (
              <Image source={CheckboxIcon} style={styles.checkbox} />
            ) : (
              <View style={[styles.checkbox, styles.noneCheck]} />
            )}
          </Pressable>
          <Text style={styles.contentsTitle}>제목</Text>
        </View>
      </View>

      <Modal isVisible={dateModalVisible}>
        <Calendar
          onDayPress={day => {
            setDateModalVisible(false);
            setSelectDate(day.dateString);
          }}
          style={styles.calendarStyle}
        />
      </Modal>

      <Modal isVisible={deleteModalVisible}>
        <View style={styles.deleteModalWrap}>
          <Text>정말 삭제하시겠습니까?</Text>
          <View style={styles.deleteModalButtonWrap}>
            <Pressable
              style={[styles.deleteModalButton, styles.deleteModalFirstButton]}
              onPress={() => setDeleteModalVisible(false)}>
              <Text>취소</Text>
            </Pressable>
            <Pressable
              style={styles.deleteModalButton}
              onPress={() => setDeleteModalVisible(false)}>
              <Text>삭제</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditPage;
