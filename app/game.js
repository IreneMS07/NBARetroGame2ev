import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'; 
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'; 
import { TEAMS } from '../src/data/teams'; 

export default function GameScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  
  const homeTeam = TEAMS.find(t => t.id === params.homeId) || TEAMS[0];
  const visitorTeam = TEAMS.find(t => t.id === params.visitorId) || TEAMS[1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>⬅ EXIT</Text> 
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <Text style={styles.topTitle}>🏀 MATCH STARTING 🏀</Text>

        <View style={styles.scoreboard}>
          <View style={styles.teamSection}>
            <View style={styles.row}>
              <Image source={homeTeam.logo} style={styles.miniLogo} />
              <Text style={[styles.teamName, { color: homeTeam.color }]}>{homeTeam.name}</Text>
            </View>
            <Text style={styles.scoreText}>0</Text>
          </View>

          <View style={styles.clockSection}><Text style={styles.timer}>12:00</Text></View>

          <View style={styles.teamSection}>
            <View style={styles.row}>
              <Text style={[styles.teamName, { color: visitorTeam.color }]}>{visitorTeam.name}</Text>
              <Image source={visitorTeam.logo} style={styles.miniLogo} />
            </View>
            <Text style={styles.scoreText}>0</Text>
          </View>
        </View>

        <View style={styles.rosterContainer}>
          <View style={styles.rosterBox}>
            <Text style={styles.rosterTitle}>HOME LINEUP</Text>
            {homeTeam.players.map((name, i) => (
              <Text key={i} style={styles.playerName}>• {name.toUpperCase()}</Text>
            ))}
          </View>
          <View style={styles.rosterBox}>
            <Text style={styles.rosterTitle}>AWAY LINEUP</Text>
            {visitorTeam.players.map((name, i) => (
              <Text key={i} style={styles.playerName}>• {name.toUpperCase()}</Text>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  mainContainer: { flex: 1, alignItems: 'center', paddingTop: 80, paddingHorizontal: 15 },
  topTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  scoreboard: { flexDirection: 'row', backgroundColor: '#111', borderWidth: 2, borderColor: '#FFF', padding: 15, width: '100%', alignItems: 'center' },
  teamSection: { flex: 1, alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  miniLogo: { width: 35, height: 35, resizeMode: 'contain', marginHorizontal: 5 },
  teamName: { fontSize: 14, fontWeight: 'bold' },
  scoreText: { color: 'yellow', fontSize: 50, fontWeight: 'bold' },
  clockSection: { width: 70, alignItems: 'center' },
  timer: { color: 'white', fontSize: 18 },
  rosterContainer: { flexDirection: 'row', width: '100%', marginTop: 25, justifyContent: 'space-between' },
  rosterBox: { width: '48%', backgroundColor: '#000080', padding: 15, borderWidth: 1.5, borderColor: 'yellow' },
  rosterTitle: { color: 'yellow', fontSize: 13, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  playerName: { color: 'white', fontSize: 16, marginBottom: 6, fontWeight: 'bold' }, // LETRA GRANDE
  backButton: { position: 'absolute', top: 50, left: 20, padding: 10, zIndex: 10 },
  backText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});