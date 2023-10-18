import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {PropsWithChildren} from 'react';

function JokeListScreen(): JSX.Element {
  const [joke, setJoke] = useState<Joke[]>([]);
  useEffect(() => {
    fetchNewJoke();
  }, []);

  const fetchNewJoke = () => {
    let header = {method: 'GET'};
    fetch('https://api.chucknorris.io/jokes/random', header)
      .then(response => response.json())
      .then(json => {
        let newJoke: Joke = json;
        setJoke([...joke, newJoke]);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const updateFavJoke = (index: number) => {
    console.log(index);
    let myJoke = joke[index];
    myJoke.is_fav = !myJoke.is_fav;
    setJoke([...joke]);
  };
  type CellItemData = {
    item: Joke;
    index: number;
  };

  function MyItem({item, index}: CellItemData): JSX.Element {
    return (
      <View style={styleSheet.cell}>
        <Text style={{padding: 12, flex: 1}}>{item.value}</Text>
        <TouchableOpacity onPress={() => updateFavJoke(index)}>
          <Text style={styleSheet.fav_Btn}>
            {item.is_fav ? 'Fav' : 'UnFav'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styleSheet.container}>
      <TouchableOpacity style={styleSheet.btn_container} onPress={fetchNewJoke}>
        <Text style={styleSheet.btn_title}>Fetch new joke</Text>
      </TouchableOpacity>
      <FlatList
        data={joke}
        renderItem={({item, index}) => <MyItem item={item} index={index} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default JokeListScreen;

const styleSheet = StyleSheet.create({
  container: {flex: 1},
  btn_container: {
    backgroundColor: '#2751D3',
    height: 44,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_title: {
    color: 'white',
    fontWeight: '800',
  },
  cell: {
    margin: 12,
    borderColor: 'rgba(164, 164, 164, 0.2)',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fav_Btn: {
    textAlign: 'center',
    padding: 4,
  },
});
//Find non repeating charactor
// function findNonRepeatingChar(str: string) {
//     let arr = Array(str);
//     for (let i = 0; i < arr.length; i++) {
//       let myStr1 = arr[i];
//       var isNonRepeat = true;
//       for (let j = 0; j < arr.length; j++) {
//         if (i != j) {
//           let myStr2 = arr[j];
//           if (myStr1 == myStr2) {
//             isNonRepeat = false;
//             break;
//           }
//         }
//       }
//       if (isNonRepeat == true) {
//         console.log(myStr1);
//         break;
//       }
//     }
//   }
// type SectionProps = PropsWithChildren<{
//     item: Joke;
//   }>;
//   function CellItem(item: Joke): JSX.Element {
//     return (
//       <View style={styleSheet.cell}>
//         {/* <Image
//             source={{uri: item.icon_url}}
//             style={{width: 40, height: 40}}
//           /> */}
//         <Text style={{padding: 12, flex: 1}}> {item.value}</Text>
//         <Text
//           style={{
//             textAlign: 'center',
//             padding: 4,
//           }}>
//           {item.is_fav ? 'Fav' : 'UnFav'}
//         </Text>
//       </View>
//     );
//   }
