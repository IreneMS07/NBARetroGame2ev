const { calcularNuevoMarcador } = require('../reglas');
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { TEAMS } from '../src/data/teams';

export default function GameScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [scoreHome, setScoreHome] = useState(0);
  const [scoreVisitor, setScoreVisitor] = useState(0);
  const [playerScores, setPlayerScores] = useState({});
  const [seconds, setSeconds] = useState(720);

  // Búsqueda de equipos
  let homeTeam = TEAMS[0];
  for (let i = 0; i < TEAMS.length; i++) { if (TEAMS[i].id === params.homeId) homeTeam = TEAMS[i]; }
  let visitorTeam = TEAMS[1];
  for (let i = 0; i < TEAMS.length; i++) { if (TEAMS[i].id === params.visitorId) visitorTeam = TEAMS[i]; }

  useEffect(function () {
    if (seconds > 0) {
      const timer = setTimeout(function () { setSeconds(seconds - 1); }, 1000);
      return function () { clearTimeout(timer); };
    }
  }, [seconds]);

  function formatTime() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + (secs < 10 ? "0" : "") + secs;
  }

  function updateScore(team, playerName, points) {
    if (team === 'home') {
      setScoreHome(calcularNuevoMarcador(scoreHome, points));
    } else {
      setScoreVisitor(calcularNuevoMarcador(scoreVisitor, points));
    }

    // Actualizamos los puntos de cada jugador 
    const newScores = { ...playerScores };
    const currentPoints = newScores[playerName] || 0;
    newScores[playerName] = calcularNuevoMarcador(currentPoints, points);
    setPlayerScores(newScores);
  }

  function finishGame() {
    router.push({
      pathname: '/winner',
      params: {
        homeScore: scoreHome,
        visitorScore: scoreVisitor,
        homeId: homeTeam.id,
        visitorId: visitorTeam.id,
        playerScores: JSON.stringify(playerScores)
      }
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* BOTÓN EXIT PARA VOLVER ATRÁS */}
      <TouchableOpacity onPress={function () { router.back(); }} style={styles.backButton}>
        <Text style={styles.backText}>⬅ EXIT</Text>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <Text style={styles.topTitle}>🏀 MATCH IN PROGRESS 🏀</Text>

        <View style={styles.scoreboard}>
          <View style={styles.teamSection}>
            <Image source={homeTeam.logo} style={styles.miniLogo} />
            <Text style={styles.scoreText}>{scoreHome}</Text>
          </View>
          <View style={styles.clockSection}>
            <Text style={styles.timer}>{formatTime()}</Text>
            <TouchableOpacity style={styles.finishBtn} onPress={finishGame}>
              <Text style={styles.finishText}>FINISH</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.teamSection}>
            <Image source={visitorTeam.logo} style={styles.miniLogo} />
            <Text style={styles.scoreText}>{scoreVisitor}</Text>
          </View>
        </View>

        <View style={styles.rosterContainer}>
          <View style={styles.rosterBox}>
            <Text style={styles.rosterTitle}>HOME</Text>
            {homeTeam.players.map(function (name, i) {
              return (
                <View key={i} style={styles.playerRow}>
                  <Text style={styles.playerName}>{name.toUpperCase()}</Text>
                  <View style={styles.btnRow}>
                    <TouchableOpacity onPress={function () { updateScore('home', name, 2) }} style={styles.addBtn}><Text style={styles.addBtnText}>+2</Text></TouchableOpacity>
                    <TouchableOpacity onPress={function () { updateScore('home', name, 3) }} style={styles.addBtn}><Text style={styles.addBtnText}>+3</Text></TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.rosterBox}>
            <Text style={styles.rosterTitle}>AWAY</Text>
            {visitorTeam.players.map(function (name, i) {
              return (
                <View key={i} style={styles.playerRow}>
                  <Text style={styles.playerName}>{name.toUpperCase()}</Text>
                  <View style={styles.btnRow}>
                    <TouchableOpacity onPress={function () { updateScore('away', name, 2) }} style={styles.addBtn}><Text style={styles.addBtnText}>+2</Text></TouchableOpacity>
                    <TouchableOpacity onPress={function () { updateScore('away', name, 3) }} style={styles.addBtn}><Text style={styles.addBtnText}>+3</Text></TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    left: 20,
    zIndex: 10
  },
  backText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 100
  },
  topTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  scoreboard: { flexDirection: 'row', backgroundColor: '#111', padding: 10, width: '95%', borderWidth: 2, borderColor: '#FFF' },
  teamSection: { flex: 1, alignItems: 'center' },
  miniLogo: { width: 40, height: 40, resizeMode: 'contain' },
  scoreText: { color: 'yellow', fontSize: 40, fontWeight: 'bold' },
  clockSection: { width: 80, alignItems: 'center', justifyContent: 'center' },
  timer: { color: 'white', fontSize: 20 },
  finishBtn: { backgroundColor: '#d32f2f', padding: 5, marginTop: 5 },
  finishText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  rosterContainer: { flexDirection: 'row', width: '100%', marginTop: 20, justifyContent: 'space-around' },
  rosterBox: { width: '48%', backgroundColor: '#1a237e', padding: 10, borderWidth: 1, borderColor: 'yellow' },
  rosterTitle: { color: 'yellow', textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  playerRow: { marginBottom: 10 },
  playerName: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  btnRow: { flexDirection: 'row', gap: 5, marginTop: 3 },
  addBtn: { borderWidth: 1, borderColor: 'white', padding: 3 },
  addBtnText: { color: 'white', fontSize: 10 }
});