import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export const AppCard = ({ children }: PropsWithChildren) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    alignSelf: 'stretch',
  },
});

export default AppCard;
