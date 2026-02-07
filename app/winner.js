import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { TEAMS } from '../src/data/teams';

export default function WinnerScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const hScore = parseInt(params.homeScore);
  const vScore = parseInt(params.visitorScore);

  // Obtenemos los puntos de los jugadores (vienen como string JSON)
  let pScores = {};
  if (params.playerScores) {
    pScores = JSON.parse(params.playerScores);
  }

  // Búsqueda manual de equipos
  let hTeam = TEAMS[0];
  for (let i = 0; i < TEAMS.length; i++) { if (TEAMS[i].id === params.homeId) hTeam = TEAMS[i]; }
  let vTeam = TEAMS[1];
  for (let i = 0; i < TEAMS.length; i++) { if (TEAMS[i].id === params.visitorId) vTeam = TEAMS[i]; }

  const isDraw = hScore === vScore;
  let winner = null;
  if (hScore > vScore) winner = hTeam;
  else if (vScore > hScore) winner = vTeam;

  function renderTopPlayers(team) {
    // Preparamos una lista de jugadores con sus puntos para poder ordenar
    var playersWithPoints = [];
    for (var i = 0; i < team.players.length; i++) {
      var name = team.players[i];
      var points = pScores[name] || 0;
      playersWithPoints.push({ name: name, points: points });
    }

    // Ordenamos de mayor a menor puntuación sin usar flechas
    playersWithPoints.sort(function (a, b) {
      return b.points - a.points;
    });

    // Filtramos para que solo aparezcan los 5 mejores
    var top5 = playersWithPoints.slice(0, 5);

    return (
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>TOP 5 - {team.name.toUpperCase()}</Text>
        <View style={styles.playersList}>
          {top5.map(function (player, i) {
            return (
              <Text key={i} style={styles.playerRow}>
                {i + 1}. {player.name.toUpperCase()} - {player.points} PTS
              </Text>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.gameOverText}>GAME OVER</Text>

        <View style={styles.resultContainer}>
          {isDraw ? (
            <View style={styles.fullWidth}>
              <Text style={styles.drawStatus}>IT'S A DRAW!</Text>
              <View style={styles.drawLogos}>
                <Image source={hTeam.logo} style={styles.logoMed} />
                <Text style={styles.vsSmall}>VS</Text>
                <Image source={vTeam.logo} style={styles.logoMed} />
              </View>
              {renderTopPlayers(hTeam)}
              {renderTopPlayers(vTeam)}
            </View>
          ) : (
            <View style={styles.fullWidth}>
              <View style={styles.winnerHeader}>
                <Image source={winner.logo} style={styles.logoBig} />
                <Text style={[styles.victoryText, { color: winner.color }]}>{winner.name} WINS!</Text>
              </View>
              {renderTopPlayers(winner)}
            </View>
          )}

          <Text style={styles.finalScore}>{hScore} - {vScore}</Text>
        </View>

        <TouchableOpacity style={styles.menuBtn} onPress={function () { router.replace('/') }}>
          <Text style={styles.menuBtnText}>NEW SEASON</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// AQUÍ ESTABA EL FALLO: Asegúrate de que esta sección empiece así
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  scrollContainer: { alignItems: 'center', paddingVertical: 30 },
  gameOverText: {
    color: 'red', fontSize: 32, fontWeight: 'bold',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10
  },
  resultContainer: {
    width: '94%', backgroundColor: '#1a237e', borderWidth: 2, borderColor: 'yellow',
    padding: 15, alignItems: 'center', marginTop: 15
  },
  fullWidth: { width: '100%', alignItems: 'center' },
  winnerHeader: { alignItems: 'center', marginBottom: 10 },
  logoBig: { width: 100, height: 100, resizeMode: 'contain' },
  logoMed: { width: 60, height: 60, resizeMode: 'contain' },
  victoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  drawStatus: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  drawLogos: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  vsSmall: { color: 'yellow', marginHorizontal: 10, fontWeight: 'bold' },
  statsSection: { width: '100%', marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 10 },
  statsTitle: { color: 'yellow', fontWeight: 'bold', fontSize: 14, textAlign: 'center', marginBottom: 8 },
  playersList: { alignItems: 'center' },
  playerRow: { color: 'white', fontSize: 12, marginBottom: 4, textAlign: 'center' },
  finalScore: { color: 'white', fontSize: 50, fontWeight: 'bold', marginTop: 15 },
  menuBtn: { backgroundColor: 'red', paddingVertical: 12, paddingHorizontal: 30, marginTop: 25, borderWidth: 2, borderColor: 'white' },
  menuBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});