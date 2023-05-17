const MypageRepository = require("../../../repositories/mypage.repository");

// mocking하기위한 객체 세팅
let mockMypageSoldBoughtModel = {
  findAll: jest.fn(),
};


//서비스 클래스 인스턴스화
let mypageRepository = new MypageRepository(mockMypageSoldBoughtModel);

describe("Mypage Prouduct Repository Unit Test", () => {
  //초기화
  beforeEach(() => {
    jest.resetAllMocks();
  });
  /*1. 결과값  검증
    2. product에서 findAll() 메소드를 잘 호출하는지 검증
    3. 매개변수 검증*/
  test("Mypage isSold Product Repo findAll Method", async () => {
    mockMypageSoldBoughtModel.findAll = jest.fn(() => {
      return [
        {
          product_id: 1,
          user_id: 1,
          user_info_id: 1,
          title: "컴퓨타팜",
          content: "얼마안씀",
          price: 200000,
          category: "컴퓨터",
          chat_count: 3,
          likes: 2,
          views: 13,
          is_sold: 1,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-25T07:52:09.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
        {
          product_id: 2,
          user_id: 3,
          user_info_id: 3,
          title: "자전거팜",
          content: "얼마안씀",
          price: 1400000,
          category: "자전거",
          chat_count: 33,
          likes: 22,
          views: 53,
          is_sold: 1,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-26T07:52:09.000Z",
          updatedAt: "2022-07-26T07:52:09.000Z",
        },
      ];
    });

    const isSoldProductAllData = await mypageRepository.getMySoldProducts({
      where: { user_id: 1, is_sold: 1 },
    });

    //1번실행인지 검증
    expect(mockMypageSoldBoughtModel.findAll).toHaveBeenCalledTimes(1);
    expect(isSoldProductAllData).toEqual( [
        {
          product_id: 1,
          user_id: 1,
          user_info_id: 1,
          title: "컴퓨타팜",
          content: "얼마안씀",
          price: 200000,
          category: "컴퓨터",
          chat_count: 3,
          likes: 2,
          views: 13,
          is_sold: 1,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-25T07:52:09.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
        {
          product_id: 2,
          user_id: 3,
          user_info_id: 3,
          title: "자전거팜",
          content: "얼마안씀",
          price: 1400000,
          category: "자전거",
          chat_count: 33,
          likes: 22,
          views: 53,
          is_sold: 1,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-26T07:52:09.000Z",
          updatedAt: "2022-07-26T07:52:09.000Z",
        },
      ]);
  });

  test("Mypage Bought Product Repo findAll Method", async () => {
    mockMypageSoldBoughtModel.findAll = jest.fn(() => {
      return [
        {
          product_id: 1,
          user_id: 1,
          user_info_id: 1,
          title: "컴퓨타팜",
          content: "얼마안씀",
          price: 200000,
          category: "컴퓨터",
          chat_count: 3,
          likes: 2,
          views: 13,
          is_sold: 0,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-25T07:52:09.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
        {
          product_id: 2,
          user_id: 3,
          user_info_id: 3,
          title: "자전거팜",
          content: "얼마안씀",
          price: 1400000,
          category: "자전거",
          chat_count: 33,
          likes: 22,
          views: 53,
          is_sold: 0,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-26T07:52:09.000Z",
          updatedAt: "2022-07-26T07:52:09.000Z",
        },
      ];
    });

    const BoughtProductAllData = await mypageRepository.getMyBuyProducts({
      where: { user_id: 1, is_sold: false },
    });
    //1번실행인지 검증
    expect(mockMypageSoldBoughtModel.findAll).toHaveBeenCalledTimes(1);
    expect(BoughtProductAllData).toEqual([
        {
          product_id: 1,
          user_id: 1,
          user_info_id: 1,
          title: "컴퓨타팜",
          content: "얼마안씀",
          price: 200000,
          category: "컴퓨터",
          chat_count: 3,
          likes: 2,
          views: 13,
          is_sold: 0,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-25T07:52:09.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
        {
          product_id: 2,
          user_id: 3,
          user_info_id: 3,
          title: "자전거팜",
          content: "얼마안씀",
          price: 1400000,
          category: "자전거",
          chat_count: 33,
          likes: 22,
          views: 53,
          is_sold: 0,
          photo_ip:
            "https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/9067de30-f3c0-11ed-a5f2-e1cd6f2d0b52	",
          createdAt: "2022-07-26T07:52:09.000Z",
          updatedAt: "2022-07-26T07:52:09.000Z",
        },
      ]);

        /* 3.자신이 좋아요누른 상품 목록조회 테스트 추가 */

  });




});
