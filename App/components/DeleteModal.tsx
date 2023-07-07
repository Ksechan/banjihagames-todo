import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const DeleteModal = ({
  isVisible,
  onCancelPress,
  onDeletePress,
}: {
  isVisible: boolean;
  onCancelPress: () => void;
  onDeletePress: () => void;
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalWrap}>
        <Text>정말 삭제하시겠습니까?</Text>
        <View style={styles.modalButtonWrap}>
          <Pressable
            style={[styles.modalButton, styles.modalTransparentButton]}
            onPress={onCancelPress}>
            <Text>취소</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={onDeletePress}>
            <Text>삭제</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  modalWrap: {
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 50,
    paddingbottom: 8,
    backgroundColor: '#fff',
  },
  modalButtonWrap: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 12,
  },
  modalButton: {
    width: 100,
    height: 32,
    backgroundColor: '#f08080',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#111',
  },
  modalTransparentButton: {
    backgroundColor: 'transparent',
    marginRight: 12,
  },
});
