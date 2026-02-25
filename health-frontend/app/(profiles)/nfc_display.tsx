// import React from 'react';
// import { View, Text } from 'react-native';
// import { useRoute, RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../components/NFCLinking'; // Ensure the path is correct

// type NFCRouteProp = RouteProp<RootStackParamList, 'NFC'>;

// const NFCDisplay = () => {
//     const route = useRoute<NFCRouteProp>();
//     const { result } = route.params || {}; // Safely access result, which is now typed

//     return (
//         <View>
//             <Text>NFC Display Screen</Text>
//             {result && <Text>Result: {result}</Text>}
//         </View>
//     );
// };

// export default NFCDisplay;
