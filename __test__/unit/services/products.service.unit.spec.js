const ProductsService = require("../../../services/products.service.js");

let mockProductsRepository = {
  createProduct: jest.fn(),
  findAllProducts: jest.fn(),
  findDetailProduct: jest.fn(),
  findRelatedProduct: jest.fn(),
  hitsProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  makeProductSold: jest.fn(),
  searchProduct: jest.fn(),
  getRegionProduct: jest.fn(),
  findSellerInfoByProductId: jest.fn(),
};

let productsService = new ProductsService();

// productsService Repository를 Mock Repository로 변경합니다.
productsService.productsRepository = mockProductsRepository;

describe("Layered Architecture Pattern Products Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Posts Service createProduct 성공", async () => {
    // 준비


    // 실행


    // 검증

  });

  test("Posts Service findAllProducts 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service findDetailProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service findRelatedProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service hitsProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service updateProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service deleteProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service makeProductSold 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service searchProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service getRegionProduct 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });

  test("Posts Service findSellerInfoByProductId 성공", async () => {
    // 준비


    // 실행


    // 검증
    
  });
});
