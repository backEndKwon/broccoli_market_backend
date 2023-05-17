const ProductsController = require('../../../controllers/products.controller.js');

let mockPostService = {
  createProduct: jest.fn(),
  getAllProduct: jest.fn(),
  getDetailProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  makeProductSold: jest.fn(),
  searchProduct: jest.fn(),
  elkSearchProduct: jest.fn(),
  elkAllProduct: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  query: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
};

const next = jest.fn();

let productsController = new ProductsController();
// productsController의 Service를 Mock Service로 변경합니다.
productsController.productsService = mockProductsService;

describe("Layered Architecture Pattern Products Controller Unit Test", () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
      jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  
      // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
      mockResponse.status = jest.fn(() => {
        return mockResponse;
      });
    });

    test("products.controller createProduct 성공", async () => {
        // 준비
        
    })



});