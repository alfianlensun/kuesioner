import { Dimensions } from "react-native";
export function screenWidthPercent(percent){
    const screenWidth = Math.round(Dimensions.get('window').width);
    return  screenWidth * percent / 100
}

export function screenHeightPercent(percent){
    const screenHeight = Math.round(Dimensions.get('window').height);
    return  screenHeight * percent / 100
}