import { render,screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mockData } from "../utils/constants";


const mockStore=configureStore()

test("stora yüklenme durumundayken ekrana loader gelir",()=>{

    const store=mockStore( {isLoading:true,error:null,data:null})

    render(
        <Provider store={store}>
            <Content/>
        </Provider>
    )
    screen.getAllById("content-loader")
});
test("stora yüklenme durumundayken ekrana error gelir",()=>{
    const store=mockStore( {isLoading:false,error:"İnternetiniz çok yavaş",data:null})

    render(
        <Provider  store={store}>
            <Content/>
        </Provider>
    )
    screen.getByTestId("error")
});
test("stora veri geldiğinde ekrana her bir değer için kart gelir",()=>{
    const store=mockStore( {isLoading:false,error:null,data:mockData})

    render(
        <Provider  store={store}>
            <Content/>
        </Provider>
    )
    const arr=Object.entries(mockData).filter(([key])=>key!=="flag")
    arr.forEach((item)=>{
        screen.getByText(item[0])
        screen.getByText(item[1])
    })
});