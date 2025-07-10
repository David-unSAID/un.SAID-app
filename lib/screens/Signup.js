// screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch } from 'react-native';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [vibeTags, setVibeTags] = useState('');
  const [locationHint, setLocationHint] = useState('');
  const [phobias, setPhobias] = useState('');
  const [sexuality, setSexuality] = useState('');
  const [idealFriend, setIdealFriend] = useState('');
  const [dealBreakers, setDealBreakers] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState({
    age: false,
    gender: false,
    email: false,
    vibeTags: false,
    locationHint: false,
    phobias: false,
    sexuality: false,
    description: false
  });

  const handleSignup = async () => {
    const userId = uuidv4();
    const { error } = await supabase.from('users').insert([{
      id: userId,
      username,
      age,
      gender,
      email,
      vibe_tags: vibeTags,
      location_hint: locationHint,
      phobias,
      sexuality,
      ideal_friend: idealFriend,
      deal_breakers: dealBreakers,
      description,
      visibility
    }]);
    if (error) {
      console.error('Signup error:', error);
    } else {
      alert('Signed up successfully!');
    }
  };

  const renderSwitch = (field) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Visible?</Text>
      <Switch
        value={visibility[field]}
        onValueChange={(value) => setVisibility({ ...visibility, [field]: value })}
      />
    </View>
  );

  return (
    <View style={{ padding: 16 }}>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} placeholder="Anonymous ID" />
      
      <Text>Age:</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType="numeric" />
      {renderSwitch('age')}

      <Text>Gender:</Text>
      <TextInput value={gender} onChangeText={setGender} placeholder="e.g. trans, nonbinary" />
      {renderSwitch('gender')}

      <Text>Email (optional):</Text>
      <TextInput value={email} onChangeText={setEmail} />
      {renderSwitch('email')}

      <Text>Vibe Tags (comma-separated):</Text>
      <TextInput value={vibeTags} onChangeText={setVibeTags} />
      {renderSwitch('vibeTags')}

      <Text>Location Hint:</Text>
      <TextInput value={locationHint} onChangeText={setLocationHint} />
      {renderSwitch('locationHint')}

      <Text>Phobias (e.g. homophobia):</Text>
      <TextInput value={phobias} onChangeText={setPhobias} />
      {renderSwitch('phobias')}

      <Text>Sexuality:</Text>
      <TextInput value={sexuality} onChangeText={setSexuality} />
      {renderSwitch('sexuality')}

      <Text>Describe Yourself:</Text>
      <TextInput value={description} onChangeText={setDescription} />
      {renderSwitch('description')}

      <Text>Ideal Friend Traits:</Text>
      <TextInput value={idealFriend} onChangeText={setIdealFriend} />

      <Text>Deal Breakers:</Text>
      <TextInput value={dealBreakers} onChangeText={setDealBreakers} />

      <Button title="Join un.SAID" onPress={handleSignup} />
    </View>
  );
}
