const MypageService = require("../../../services/mypage.service");

// mocking하기위한 객체 세팅
let mockMypageModel = {
  getMySoldProducts: jest.fn(),
  getMyBuyProducts: jest.fn(),
  getMyLikeProducts: jest.fn(),
};

//서비스 클래스 인스턴스화
let mypageService = new MypageService();
mypageService.mypageRepository = mockMypageModel;
describe("Mypage Service Unit Test", () => {
  //초기화
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Mypage Service getMySoldProducts Method", async () => {
    //판매상품 존재하지 않을경우 오류 메세지 반환
    const value = null;
    mockMypageModel.getMySoldProducts = jest.fn(() => {
      return value;
    });
    const soldProduct = await mypageService.getMyBuyProducts(1)
    try {
    // await mypageService.getMySoldProducts(1);
    } catch (error) {
      expect(mockMypageModel.getMySoldProducts).toHaveBeenCalledTimes(1);
      expect(mockMypageModel.getMySoldProducts).toHaveBeenCalledWith(1);
      expect(error).toEqual("판매 상품이 존재하지 않습니다.");
    }
  });


  test("Mypage Service getMyBuyProducts Method", async () => {
    //판매상품 존재하지 않을경우 오류 메세지 반환
    const value = 0;
    mockMypageModel.getMyBuyProducts = jest.fn(() => {
      return value;
    });
    try {
    await mypageService.getMyBuyProducts(1);
    } catch (error) {
      expect(mockMypageModel.getMyBuyProducts).toHaveBeenCalledTimes(1);
      expect(mockMypageModel.getMyBuyProducts).toHaveBeenCalledWith(1);
      expect(error).toEqual("구매내역이 존재하지 않습니다.");
    }
  });
  test("Mypage Service getMyLikeProducts Method", async () => {
    //판매상품 존재하지 않을경우 오류 메세지 반환
    const value = null;
    mockMypageModel.getMyLikeProducts = jest.fn(() => {
      return value;
    });
    try {
    const getMyLikeProducts = await mypageService.getMyLikeProducts(2);
    } catch (error) {
      expect(mockMypageModel.getMyLikeProducts).toHaveBeenCalledTimes(1);
      expect(mockMypageModel.getMyLikeProducts).toHaveBeenCalledWith(1);
      expect(error).toEqual("관심 상품이 존재하지 않습니다.");
    }
  });


});
