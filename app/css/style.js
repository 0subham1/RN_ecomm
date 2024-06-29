import { Dimensions, StyleSheet, useColorScheme } from "react-native";

const isDark=useColorScheme()==="dark"

export default StyleSheet.create({
//common
  white: { backgroundColor: isDark?"black":"white", margin: 5 },
  badge: {
    top: 0,
    right: 6,
    bottom: 8,
    position: "absolute",
  },

  inputField: {
    margin: 10,
    padding: 5,
    width: Dimensions.get("screen").width - 40,
    backgroundColor: isDark?"black":"white",
    color:isDark?"white":"black"
  },

  container: {
    flex: 1,
    backgroundColor:  isDark?"black":"white",  
    color:isDark?"white":"black",
    alignItems: "center",
    // justifyContent: "center",
  },

  welcomeTxt: {
    fontSize: 40,
    textAlign: "right",
  },

  logo: {
    height: 100,
    width: 100,
  },
  bottomView: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 50,
    backgroundColor:  isDark?"black":"white",
    color:isDark?"white":"black",
    elevation: 7,
    alignItems: "center",
    bottom: 0,
  },
  row: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    // justifyContent: "center",
  },
  row0: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    width: Dimensions.get("screen").width - 30,
    marginBottom: 10,
    backgroundColor:  isDark?"black":"white",
    color:isDark?"white":"black",
    borderWidth: 1,
    elevation: 10,
  },
  card: {
    width: Dimensions.get("screen").width - 15,
    padding: 5,
    margin: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    backgroundColor:  isDark?"black":"white",
    color:isDark?"white":"black",
    borderRadius: 5,
    
  },
  row1: {
    padding: 2,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    margin: 2,
    padding: 2,
  },
  qtybtn: { backgroundColor: "#87CEFA" },
  btn: {
    margin: 5,
    padding: 5,
    backgroundColor: "#87CEFA",//blue
    borderRadius: 5,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  txt: {
    borderRadius: 8,
    width: "50%",
    padding: 2,
    margin: 2,
    elevation: 4,
    backgroundColor: isDark?"black":"white",
    color:isDark?"white":"black",
    alignItems: "center",
  },
});
