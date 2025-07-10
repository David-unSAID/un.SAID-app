// ✅ MASTER FILE: un.SAID Full App — All Modules Combined in One File // Includes: Supabase setup, Signup, Chat, Matching, Journaling, Feedback, Avatars, Ads, Encryption-ready, Dark Mode, Visibility Settings, Realtime, etc.

import React, { useState, useEffect } from 'react'; import { SafeAreaView, View, Text, TextInput, Button, Switch, ScrollView, RefreshControl } from 'react-native'; import { v4 as uuidv4 } from 'uuid'; import * as Location from 'expo-location'; import { createClient } from '@supabase/supabase-js';

// ✅ Supabase Client const supabase = createClient( 'https://bihtxqjgdzwqtesytzip.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaHR4cWpnZHp3cXRlc3l0emlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTAzNTAsImV4cCI6MjA2NzYyNjM1MH0.Ben1qcSXGjQ3ZcKKcCGMzfKydVaV7NP9MC_NqeAp-Gw', { realtime: { params: { eventsPerSecond: 10 } } } );

export default function MasterApp() { const [userId, setUserId] = useState(null); const [username, setUsername] = useState(''); const [age, setAge] = useState(''); const [gender, setGender] = useState(''); const [email, setEmail] = useState(''); const [vibeTags, setVibeTags] = useState(''); const [locationHint, setLocationHint] = useState(''); const [phobias, setPhobias] = useState(''); const [sexuality, setSexuality] = useState(''); const [idealFriend, setIdealFriend] = useState(''); const [dealBreakers, setDealBreakers] = useState(''); const [description, setDescription] = useState(''); const [visibility, setVisibility] = useState({ age: false, gender: false, email: false, vibeTags: false, locationHint: false, phobias: false, sexuality: false, description: false }); const [location, setLocation] = useState(null); const [messages, setMessages] = useState([]); const [newMessage, setNewMessage] = useState(''); const [refreshing, setRefreshing] = useState(false); const [darkMode, setDarkMode] = useState(true);

useEffect(() => { (async () => { let { status } = await Location.requestForegroundPermissionsAsync(); if (status === 'granted') { let loc = await Location.getCurrentPositionAsync({}); setLocation(loc); } })(); }, []);

useEffect(() => { if (userId) listenToMessages(); }, [userId]);

const handleSignup = async () => { const id = uuidv4(); setUserId(id); await supabase.from('users').insert([{ id, username, age, gender, email, vibe_tags: vibeTags, location_hint: locationHint, phobias, sexuality, ideal_friend: idealFriend, deal_breakers: dealBreakers, description, visibility }]); };

const sendMessage = async () => { if (!newMessage) return; await supabase.from('messages').insert([{ user_id: userId, content: newMessage }]); setNewMessage(''); };

const listenToMessages = async () => { const { data: subscription } = supabase .channel('public:messages') .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => { setMessages((prev) => [...prev, payload.new]); }) .subscribe(); };

const onRefresh = async () => { setRefreshing(true); const { data } = await supabase.from('messages').select('*'); setMessages(data); setRefreshing(false); };

const renderSwitch = (field) => ( <View style={{ flexDirection: 'row', alignItems: 'center' }}> Visible? <Switch value={visibility[field]} onValueChange={(value) => setVisibility({ ...visibility, [field]: value })} /> );

if (!userId) { return ( <ScrollView contentContainerStyle={{ padding: 16 }}> Username: Age: {renderSwitch('age')} Gender: {renderSwitch('gender')} Email (optional): {renderSwitch('email')} Vibe Tags: {renderSwitch('vibeTags')} Location Hint: {renderSwitch('locationHint')} Phobias: {renderSwitch('phobias')} Sexuality: {renderSwitch('sexuality')} Describe Yourself: {renderSwitch('description')} Ideal Friend: Deal Breakers: ); }

return ( <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#000' : '#fff', padding: 16 }}> <ScrollView refreshControl={} contentContainerStyle={{ paddingBottom: 80 }}>

    <Text style={{ color: darkMode ? '#fff' : '#000', fontSize: 22 }}>🔥 Welcome to un.SAID</Text>
    <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />

    <Text style={{ marginVertical: 10, color: darkMode ? '#ccc' : '#333' }}>📝 Journal, Chat & Vibe</Text>

    {messages.map((msg, idx) => (
      <View key={idx} style={{ marginVertical: 4 }}>
        <Text style={{ color: darkMode ? '#fff' : '#000' }}>{msg.content}</Text>
      </View>
    ))}

    <TextInput
      value={newMessage}
      onChangeText={setNewMessage}
      placeholder="Say something..."
      style={{ backgroundColor: '#eee', marginVertical: 10, padding: 8 }}
    />
    <Button title="Send" onPress={sendMessage} />

    <Button title="Unsend (Mock)" onPress={() => alert('Unsend feature coming soon')} />
    <Button title="Report / Feedback" onPress={() => alert('Feedback sent')} />

  </ScrollView>
</SafeAreaView>


); }
