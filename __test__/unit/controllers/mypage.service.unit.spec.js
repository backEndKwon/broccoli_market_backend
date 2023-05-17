const MypageService = require("../../../services/mypage.service");

// mocking하기위한 객체 세팅
let mockMypageModel = {
  getMySellingProducts: jest.fn(),
  getMySoldProducts: jest.fn(),
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

  /* 1.판매 중인 상품 목록조회 */
  test("Service Mypage 판매중인 상품조회(정상 진행 부분)", async () => {
    // value 있을 경우
    const value = [{}, {}];
    mockMypageModel.getMySellingProducts = jest.fn(() => {
      return value;
    });
    const sellProduct = await mypageService.getMySellingProducts(2);
    expect(mockMypageModel.getMySellingProducts).toHaveBeenCalledTimes(1);
    expect(mockMypageModel.getMySellingProducts).toHaveBeenCalledWith(2);
    expect(sellProduct).toEqual(value);
  });
  test("Service Mypage 판매중인 상품조회(Error부분)", async () => {
    //value 가 존재하지않아 오류 발생할 경우
    const value = [];
    mockMypageModel.getMySellingProducts = jest.fn(() => {
      return value;
    });
    try {
      //가정=>user_id : 2
      const sellProduct = await mypageService.getMySellingProducts(2);
    } catch (error) {
      expect(mockMypageModel.getMySellingProducts).toHaveBeenCalledTimes(1);
      expect(mockMypageModel.getMySellingProducts).toHaveBeenCalledWith(2);
      expect(error.message).toEqual("판매 상품이 존재하지 않습니다.");
    }
  });

  /* 2.판매완료(is_sold = true) 상품 목록조회 */
  test("Service Mypage 판매완료 상품조회(정상 진행 부분)", async () => {
    // value 있을 경우
    const value = [{}, {}];
    mockMypageModel.getMySoldProducts = jest.fn(() => {
      return value;
    });
    const soldProduct = await mypageService.getMySoldProducts(2);
    expect(mockMypageModel.getMySoldProducts).toHaveBeenCalledTimes(1);
    expect(mockMypageModel.getMySoldProducts).toHaveBeenCalledWith(2);
    expect(soldProduct).toEqual(value);
  });
  test("Service Mypage 판매완료 상품조회(Error부분)", async () => {
    //value 가 존재하지않아 오류 발생할 경우
    const value = [];
    mockMypageModel.getMySoldProducts = jest.fn(() => {
      return value;
    });
    try {
      //가정=>user_id : 2
      const soldProduct = await mypageService.getMySoldProducts(2);
    } catch (error) {
      expect(mockMypageModel.getMySoldProducts).toHaveBeenCalledTimes(1);
      expect(mockMypageModel.getMySoldProducts).toHaveBeenCalledWith(2);
      expect(error.message).toEqual("구매내역이 존재하지 않습니다.");
    }
  });

  /* 3.자신이 좋아요누른 상품 목록조회 */
  test("Service Mypage 관심등록 상품조회(정상 진행 부분)", async () => {
    // value 있을 경우
    const value = [{}, {}];
    mockMypageModel.getMyLikeProducts = jest.fn(() => {
      return value;
    });
    const likeProduct = await mypageService.getMyLikeProducts(2);
    expect(mockMypageModel.getMyLikeProducts).toHaveBeenCalledTimes(1);
    expect(mockMypageModel.getMyLikeProducts).toHaveBeenCalledWith(2);
    expect(likeProduct).toEqual(value);
  });
  test("Service Mypage 관심등록 상품조회(Error부분)", async () => {
    //value 가 존재하지않아 오류 발생할 경우
    const value = [];
    mockMypageModel.getMyLikeProducts = jest.fn(() => {
      return value;
    });
    try {
      //가정=>user_id : 2
      const likeProduct = await mypageService.getMyLikeProducts(2);
    } catch (error) {
      expect(mockMypageModel.getMyLikeProducts).toHaveBeenCalledTimes(1);
      expect(mockMypageModel.getMyLikeProducts).toHaveBeenCalledWith(2);
      expect(error.message).toEqual("관심 상품이 존재하지 않습니다.");
    }
  });
});
