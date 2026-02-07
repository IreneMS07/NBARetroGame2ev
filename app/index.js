import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { TEAMS } from '../src/data/teams';

export default function SelectionScreen() {
  const router = useRouter();
  const [p1Idx, setP1Idx] = useState(0);
  const [p2Idx, setP2Idx] = useState(1);

  function handleStart() {
    router.push({
      pathname: '/game',
      params: { homeId: TEAMS[p1Idx].id, visitorId: TEAMS[p2Idx].id }
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.headerTitle}>NBA JAM SELECTION</Text>

      <View style={styles.layoutRow}>
        <View style={styles.sideColumn}>
          {TEAMS.map(function (team, i) {
            return (
              <TouchableOpacity key={"p1-" + i}
                style={[styles.teamButton, p1Idx === i && styles.activeP1]}
                onPress={function () { setP1Idx(i); }}>
                <Image source={team.logo} style={styles.sideLogo} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.centerSection}>
          <View style={styles.previewBox}>
            <Text style={styles.label}>PLAYER 1</Text>
            <Image source={TEAMS[p1Idx].logo} style={styles.heroLogo} />
            <Text style={styles.teamNameText}>{TEAMS[p1Idx].name}</Text>
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
            <Text style={styles.startText}>START GAME</Text>
          </TouchableOpacity>

          <View style={styles.previewBox}>
            <Text style={styles.label}>PLAYER 2</Text>
            <Image source={TEAMS[p2Idx].logo} style={styles.heroLogo} />
            <Text style={styles.teamNameText}>{TEAMS[p2Idx].name}</Text>
          </View>
        </View>

        <View style={styles.sideColumn}>
          {TEAMS.map(function (team, i) {
            return (
              <TouchableOpacity key={"p2-" + i}
                style={[styles.teamButton, p2Idx === i && styles.activeP2]}
                onPress={function () { setP2Idx(i); }}>
                <Image source={team.logo} style={styles.sideLogo} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0000AA' },
  headerTitle: {
    color: 'yellow', fontSize: 22, textAlign: 'center', fontWeight: 'bold',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 50,
    marginBottom: 15
  },
  layoutRow: { flexDirection: 'row', flex: 1, paddingHorizontal: 20 },
  sideColumn: { width: '18%', justifyContent: 'space-evenly' },
  centerSection: { width: '64%', alignItems: 'center', justifyContent: 'center' },
  teamButton: { width: '100%', height: '14%', backgroundColor: '#000080', borderWidth: 1.5, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  activeP1: { borderColor: 'yellow', borderWidth: 3 },
  activeP2: { borderColor: 'red', borderWidth: 3 },
  sideLogo: { width: '80%', height: '80%', resizeMode: 'contain' },
  previewBox: { width: '85%', height: '32%', backgroundColor: '#000080', borderWidth: 2, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  label: { color: 'yellow', fontSize: 10, marginBottom: 5 },
  heroLogo: { width: 70, height: 70, resizeMode: 'contain' },
  teamNameText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  startBtn: { backgroundColor: 'red', padding: 12, borderWidth: 2, borderColor: '#FFF', marginVertical: 10 },
  startText: { color: '#FFF', fontWeight: 'bold' }
});