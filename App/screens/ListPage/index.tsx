import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Animated,
} from 'react-native';
import styles from './style';
import {StackNavigatorParamList} from '../../types';
import {ItemType} from '../../types';
import {today, dateHandler} from '../../utils/todoDate';
import addItem from '../../utils/addItem';
import DeleteModal from '../../components/DeleteModal';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import dayjs from 'dayjs';

const FloatingIcon = require('../../assets/icon/btn_add.png');
const CheckboxIcon = require('../../assets/icon/checkbox_check.png');
const DeleteIcon = require('../../assets/icon/ic_delete.png');

const ListPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorParamList>>();
  const isFocused = useIsFocused();
  // todos list
  const [todos, setTodos] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  // 모달 스위치
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // 모달 삭제
  const [deleteId, setDeleteId] = useState<null | number>(null);
  // 태그 필터링
  const [selectTag, setSelectTag] = useState('');

  const duplecateArray = new Array();

  const getData = async () => {
    await AsyncStorage.getAllKeys().then(keys =>
      AsyncStorage.multiGet(keys, (err, stores) => {
        if (stores !== undefined) {
          stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            const data = value !== null && JSON.parse(value);
            duplecateArray.unshift(data);
          });
        }
      }),
    );
    setTodos(duplecateArray);
    setFilterData(duplecateArray);
  };

  const removeItemHandler = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return getData();
    } catch (exception) {
      return false;
    }
  };

  const addItemHandler = async (item: ItemType) => {
    const newTodos = {
      id: item.id,
      check: !item.check,
      date: item.date,
      title: item.title,
      tag: item.tag,
    };

    await addItem(`${newTodos.id}`, newTodos);
    getData();
  };

  const renderRightActions = (
    dragX: Animated.AnimatedInterpolation<string | number>,
    id: number,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        onPress={() => {
          setDeleteModalVisible(true);
          setDeleteId(id);
        }}
        style={styles.rightAction}>
        <Animated.Image
          style={[
            styles.deleteIconStyle,
            {
              transform: [{translateX: trans}],
            },
          ]}
          source={DeleteIcon}
        />
      </RectButton>
    );
  };

  useEffect(() => {
    getData();
    setSelectTag('');
  }, [isFocused]);

  let rowRefs = new Map();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {todos.length !== 0 ? (
            filterData
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .map((item, index) => {
                const expired_at = dayjs(item.date);
                const result = expired_at.diff(today, 'day', true);
                return (
                  <GestureHandlerRootView key={item.id}>
                    <Swipeable
                      key={item.id}
                      renderRightActions={dragX =>
                        renderRightActions(dragX, item.id)
                      }
                      overshootFriction={8}
                      ref={ref => {
                        if (ref && !rowRefs.get(item.id)) {
                          rowRefs.set(item.id, ref);
                        }
                      }}
                      onSwipeableWillOpen={() => {
                        [...rowRefs.entries()].forEach(([key, ref]) => {
                          if (key !== item.id && ref) ref.close();
                        });
                      }}>
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          navigation.navigate('edit', {
                            id: item.id,
                            title: item.title,
                            tag: item.tag,
                            date: item.date,
                            check: item.check,
                          });
                        }}
                        style={styles.listWrap}>
                        {/* 체크박스 */}
                        <Pressable
                          onPress={() => {
                            addItemHandler(item);
                          }}>
                          {item.check ? (
                            <Image
                              source={CheckboxIcon}
                              style={styles.checkbox}
                            />
                          ) : (
                            <View style={[styles.checkbox, styles.noneCheck]} />
                          )}
                        </Pressable>
                        {/* 할 일 */}
                        <View style={styles.listTitleWrap}>
                          <Text
                            style={[
                              styles.listTitle,
                              item.check && styles.completeTodo,
                            ]}>
                            {item.title}
                          </Text>
                          <View style={styles.listTagWrap}>
                            {/* 태그 */}
                            {item.tag.map((el: string, index: number) => {
                              return (
                                <Pressable
                                  key={index}
                                  style={[
                                    styles.listTag,
                                    selectTag === el && styles.activeTag,
                                  ]}
                                  onPress={() => {
                                    if (selectTag === el) {
                                      setSelectTag('');
                                      getData();
                                    } else {
                                      setSelectTag(el);
                                      setFilterData(
                                        todos.filter(item =>
                                          item.tag.includes(el),
                                        ),
                                      );
                                    }
                                  }}>
                                  <Text>{el}</Text>
                                </Pressable>
                              );
                            })}
                          </View>
                        </View>
                        {/* 만료일 */}
                        <Text
                          style={[
                            styles.listDateText,
                            result <= 1 && styles.activeColor,
                          ]}>
                          {item.date === ''
                            ? '날짜추가'
                            : dateHandler({result, selectDate: item.date})}
                        </Text>
                      </Pressable>
                    </Swipeable>
                  </GestureHandlerRootView>
                );
              })
          ) : (
            <Text style={styles.blackText}>할일을 등록해주세요</Text>
          )}
        </View>
      </ScrollView>
      <Pressable onPress={() => navigation.navigate('edit')}>
        <Image source={FloatingIcon} style={styles.floatingButton} />
      </Pressable>
      {/* 삭제확인 모달 */}
      <DeleteModal
        isVisible={deleteModalVisible}
        onCancelPress={() => setDeleteModalVisible(false)}
        onDeletePress={() => {
          if (deleteId !== null) {
            removeItemHandler(deleteId.toString());
            setSelectTag('');
          }
          setDeleteModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ListPage;
