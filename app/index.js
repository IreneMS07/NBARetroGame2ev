import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { TEAMS } from '../src/data/teams';

export default function SelectionScreen() {
  const router = useRouter();
  const [p1Idx, setP1Idx] = useState(0);
  const [p2Idx, setP2Idx] = useState(1);

  const handleStart = () => {
    // Transportamos la información mediante IDs 
    router.push({
      pathname: '/game',
      params: { homeId: TEAMS[p1Idx].id, visitorId: TEAMS[p2Idx].id }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.headerTitle}>NBA JAM SELECTION</Text>
      
      <View style={styles.layoutRow}>
        <View style={styles.sideColumn}>
          {TEAMS.map((team, i) => (
            <TouchableOpacity key={`p1-${i}`} 
              style={[styles.teamButton, p1Idx === i && styles.activeP1]}
              onPress={() => setP1Idx(i)}>
              <Image source={team.logo} style={styles.sideLogo} />
            </TouchableOpacity>
          ))}
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
          {TEAMS.map((team, i) => (
            <TouchableOpacity key={`p2-${i}`} 
              style={[styles.teamButton, p2Idx === i && styles.activeP2]}
              onPress={() => setP2Idx(i)}>
              <Image source={team.logo} style={styles.sideLogo} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0000AA' },
  headerTitle: { color: 'yellow', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginVertical: 15 },
  layoutRow: { flexDirection: 'row', flex: 1, paddingHorizontal: 30 },
  sideColumn: { width: '15%', justifyContent: 'space-evenly' }, 
  centerSection: { width: '70%', alignItems: 'center', justifyContent: 'center' }, 
  teamButton: { width: '100%', height: '14%', backgroundColor: '#000080', borderWidth: 1.5, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  activeP1: { borderColor: 'yellow', borderWidth: 3 },
  activeP2: { borderColor: 'red', borderWidth: 3 },
  sideLogo: { width: '80%', height: '80%', resizeMode: 'contain' },
  previewBox: { width: '70%', height: '35%', backgroundColor: '#000080', borderWidth: 2, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  label: { color: 'yellow', fontSize: 10, marginBottom: 5 },
  heroLogo: { width: 80, height: 80, resizeMode: 'contain' },
  teamNameText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  startBtn: { backgroundColor: 'red', padding: 12, borderWidth: 2, borderColor: '#FFF', marginVertical: 15 },
  startText: { color: '#FFF', fontWeight: 'bold' }
});