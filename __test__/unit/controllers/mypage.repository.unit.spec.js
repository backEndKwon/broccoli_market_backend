const MypageRepository = require("../../../repositories/mypage.repository");

let mockMypageProductsModel = {
  // repo에서 this.ProductsModel을 대신하는 역할
  findAll: jest.fn(),
};
let mockMypageLikeModel = {
  //repo에서 this.LikesModel을 대신하는 역할
  findAll: jest.fn(),
};
//서비스 클래스 인스턴스화
let mypageRepository = new MypageRepository(
  mockMypageProductsModel,
  mockMypageLikeModel
);

describe("Mypage Repository Unit Test", () => {
  //초기화
  beforeEach(() => {
    jest.resetAllMocks();
  });

  /* 1.판매 중(is_sold = false) 상품 목록조회 */
  test("Repository Mypage 판매중인 상품조회", async () => {
    mockMypageProductsModel.findAll = jest.fn(() => {
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

    const sellProductAllData = await mypageRepository.getMySellingProducts({
      where: { user_id: 1, is_sold: 1 },
    });

    expect(mockMypageProductsModel.findAll).toHaveBeenCalledTimes(1);
    expect(sellProductAllData).toEqual([
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

  /* 2.판매완료(is_sold = true) 상품 목록조회 */
  test("Repository Mypage 판매완료된 상품조회", async () => {
    mockMypageProductsModel.findAll = jest.fn(() => {
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

    const soldProductAllData = await mypageRepository.getMySoldProducts({
      where: { user_id: 1, is_sold: false },
    });

    expect(mockMypageProductsModel.findAll).toHaveBeenCalledTimes(1);
    expect(soldProductAllData).toEqual([
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
  });

  /* 3.자신이 좋아요누른 상품 목록조회 */
  //시간적 여유 있을 시 다시 진행
});
