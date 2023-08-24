import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import style from "../css/style";
import { BASE_URL } from "../common/Const";
import axios from "axios";
import { AuthContext } from "../common/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [type, setType] = useState("Sign In");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { store, setStore } = useContext(AuthContext);
  const navigation = useNavigation();

  const toast = (msg) => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (store.user) {
      setType("Edit user");
      setName(store.user?.name);
      setPhone(store?.user?.phone?.toString());
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    let data = {
      name: name.trim(),
      password: password.trim(),
      phone: Number(phone.trim()),
    };
    if (!name) {
      toast("Please enter name");
      setLoading(false);
      return;
    }
    if (!password) {
      toast("Please enter password");
      setLoading(false);
      return;
    }
    if (!store.user) {
      if (type == "Sign In") {
        axios
          .post(BASE_URL + "login", data)
          .then((res) => {
            if (res.data.result) {
              setStore({
                ...store,
                user: res.data.result,
                auth: res.data.auth,
                path: "FoodyWoody",
              });

              toast("login successful");
              navigation.navigate("home");
              setLoading(false);
            } else {
              toast("login unSuccessful");
              setLoading(false);
            }
          })
          .catch((err) => {
            toast("Incorrect Details");
            setLoading(false);
          });
      } else {
        axios
          .post(BASE_URL + "signUp", data)
          .then((res) => {
            if (res.data) {
              if (res.data == "user already exist with given name") {
                toast(res.data);
                setLoading(false);
              } else {
                setStore({ ...store, user: res.data, path: "FoodyWoody" });
                navigation.navigate("home");
                toast("SignUp successful");
                setLoading(false);
              }
            } else {
              toast("SignUp UnSuccessful");
              setLoading(false);
            }
          })
          .catch((err) => {
            toast("Bad Request");
            setLoading(false);
          });
      }
    }
    if (type == "Edit user") {
      if (!phone) {
        toast("Please enter phone");
        setLoading(false);
        return;
      }

      axios
        .put(BASE_URL + "editUser/" + store?.user._id, data)
        .then((res) => {
          if (res.data.matchedCount > 0) {
            toast("user Updated");
            axios.get(BASE_URL + "user/" + store?.user._id).then((res) => {
              navigation.navigate("home");
              setStore({ ...store, user: res.data, path: "FoodyWoody" });
            });
            setLoading(false);
          } else {
            toast("user not updated");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast("bad request");
          setLoading(false);
        });
    }
  };

  const handleFlickType = () => {
    if (type == "Sign In") {
      setType("Sign Up");
    } else {
      setType("Sign In");
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        textColor="#000000"
        style={style.inputField}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(e) => setName(e)}
      />
      {(type == "Sign Up" || type == "Edit user") && (
        <TextInput
          style={style.inputField}
          mode="outlined"
          label="Phone"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChangeText={(e) => setPhone(e)}
        />
      )}

      <TextInput
        style={style.inputField}
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
      />

      {!loading && (
        <Button onPress={() => handleSave()} mode="contained-tonal">
          {type}
        </Button>
      )}
      {!store.user && (
        <Text style={{ margin: 20 }} onPress={handleFlickType}>
          {type == "Sign In"
            ? "New Here? Sign Up"
            : "Already have account? Sign In"}
        </Text>
      )}
      {loading && <ActivityIndicator animating={true} />}
    </View>
  );
};

export default Profile;
