const MypageController = require("../../../controllers/mypage.controller");

// mocking하기위한 객체 세팅
let mockMypageService = {
  getMySellingProducts: jest.fn(),
  getMySoldProducts: jest.fn(),
  getMyLikeProducts: jest.fn(),
};
let mockRequest = {
  body: jest.fn(),
};
let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
};
let next = jest.fn();
//서비스 클래스 인스턴스화
let mypageController = new MypageController();

//마이페이지 컨트롤러의 서비스모델을 MOCK서비스로 변경
mypageController.mypageService = mockMypageService;

describe("Mypage Controller Unit Test", () => {
  //MOCK 초기화
  beforeEach(() => {
    jest.resetAllMocks();

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  /* 1.판매 중인 상품 목록조회 */
  test("Mypage Controller 판매중인 상품조회(정상 진행 부분)", async () => {
    const user = { user_id: 2 }; //현재 요청을 보내는 client의 정보
    mockResponse.locals.user = user; //authmiddleware에서 인증된 유저의 정보 추출
    //testCode라고 이부분 간과하면 Cannot read property 'user_id' of undefined와 같은 런타임 에러가 발생

    const value = [{}];
    mockMypageService.getMySellingProducts = jest.fn(() => {
      return value;
    });
    //실행
    await mypageController.getMySellingProducts(
      mockRequest,
      mockResponse,
      next
    );
    //검증
    //1.호출 및 user_id 연동 여부
    expect(mockMypageService.getMySellingProducts).toHaveBeenCalledTimes(1);
    expect(mockMypageService.getMySellingProducts).toHaveBeenCalledWith(
      user.user_id
    );
    //2.json 호출 여부 및 반환 값 확인
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ sellProduct: value });
    //3.status 201확인
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});
