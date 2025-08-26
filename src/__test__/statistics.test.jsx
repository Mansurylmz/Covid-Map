import { render,screen, waitFor } from "@testing-library/react";
import Statistic from "../pages/home/statistics";
import { totalApi } from "../utils/api";
import { totalData } from "../utils/constants";
import millify from "millify";

/* 
* Yazıcağımız testler kesinlikle api isteklerine bağımlı olmamalı, yani api'dan gelecek cevap testin geçip geçememe durumunu etkilememli

* api isteği atan fonksiyonu mock'layıp api'dan gelicek cevapları kendimiz belirliyicez bu sayede component api isteklerini düzgün bir şekilde ele alıyo mu test etmiş olucaz hemde gerçek api'la olan bağlantıyı tamamen koparıcaz
*/

// api isteğini atan fonksiyonu mock'la
jest.mock("../utils/api",()=>({
    totalApi: { get: jest.fn() },
}))

describe("İstatistik component testleri",()=>{

    //her testten önce bütün mockları temizle

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test("bileşen renderlandığında ekrana loader gelir",()=>{
        totalApi.get.mockReturnValue(new Promise(()=>{}))
        render(<Statistic/>)
        screen.getByTestId("loader")
    });
    test("apiden hata geldiğinde ekrana hata mesajı gelirr",async()=>{
        totalApi.get.mockRejectedValue(new Error("404 hatası"))
        render(<Statistic/>)
        await waitFor(()=>screen.getByText("Üzgünüz bir sorun oluştu"))
    });
    test("apiden cevap geldiğinde ekrana verilerı gelir",async()=>{
        totalApi.get.mockResolvedValue({data:{data:totalData}})
        render(<Statistic/>)
        await waitFor(()=>expect(totalApi.get).toHaveBeenCalled())
        screen.getByText(millify(totalData.confirmed))
        screen.getByText(millify(totalData.active))
        screen.getByText(millify(totalData.deaths))
    })
})