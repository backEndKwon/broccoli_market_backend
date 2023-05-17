const ProductsService = require("../services/products.service");
const { productSchema } = require("../middlewares/joi");
const es = require("@elastic/elasticsearch");

class ProductsController {
  productsService = new ProductsService();

  // 중고거래 상품 생성
  createProduct = async (req, res, next) => {
    try {
      const { user_id, id } = res.locals.user;
      const { value, error } = productSchema.validate(req.body);
      if (error) {
        error.errorCode = 412;
        next(error, req, res, error.message);
      }

        await this.productsService.createProduct(
          user_id,
          id,
          value.title,
          value.content,
          value.price,
          value.category,
          value.photo_ip
        );

      return res.status(201).json({ message: "상품 생성 완료" });
    } catch (error) {
      next(error, req, res, "상품 생성에 실패하였습니다.");
    }
  };

  // 중고거래 상품 전체 조회
  getAllProduct = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ products });
    } catch (error) {
      next(error, req, res, "상품 조회에 실패하였습니다.");
    }
  };

  // 중고거래 상품 상세 조회
  getDetailProduct = async (req, res, next) => {
    try {
      const { product_id } = req.params;

      if (product_id === 'search') {
        return next();
      }

      const product = await this.productsService.findDetailProduct(product_id);

      return res.status(200).json({ product });
    } catch (error) {
      next(error, req, res, "상품 상세 조회에 실패하였습니다.");
    }
  };

  // 중고거래 상품 수정
  updateProduct = async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { user_id, id } = res.locals.user;
      const { value, error } = productSchema.validate(req.body);

      if (error) {
        return res.status(412).json({ errorMessage: error.message });
      }
      const updateProduct = await this.productsService.updateProduct(
        product_id,
        user_id,
        id,
        value.title,
        value.content,
        value.price,
        value.category,
        value.photo_ip
      );

      return res.status(200).json({ updateProduct });
    } catch (error) {
      next(error, req, res, "상품 수정에 실패하였습니다.");
    }
  };

  // 중고거래 상품 삭제
  deleteProduct = async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { user_id, id } = res.locals.user;

      await this.productsService.deleteProduct(product_id, user_id, id);

      return res.status(200).json({ message: "상품 삭제 완료" });
    } catch (error) {
      next(error, req, res, "상품 삭제에 실패하였습니다.");
    }
  };

  // 중고거래 상품 거래 완료
  makeProductSold = async (req, res, next) => {
    const { product_id } = req.params;
    const { user_id } = res.locals.user;

    try {
      await this.productsService.makeProductSold(product_id, user_id);
      return res.status(200).json({ message: "상품 거래 완료" });
    } catch (error) {
      next(error, req, res, "상품 거래에 실패하였습니다.");
    }
  };

  // 중고거래 상품 검색
  searchProduct = async (req, res, next) => {
    try {
      const keyword = req.query.keyword;

      const result = await this.productsService.searchProduct(keyword);

      return res.status(200).json({ result });
    } catch (error) {
      next(error, req, res, '상품 검색에 실패하였습니다.');
    }
  };

  // 중고거래 상품 검색 (ELK)
  elkSearchProduct = async (req, res, next) => {
    try {
      const keyword = req.query.keyword;
    
      // Elasticsearch에 대한 연결을 만듭니다.
      // host 및 nodes 주소는 배포 환경에 맞는 Elasticsearch 실제 구동 주소로 기입해야 합니다!
      const client = new es.Client({
        host: 'http://localhost:9200',
        nodes: ['http://localhost:9200'],
      });

      // 검색을 실행하고 결과를 가져옵니다.
      const datas = await client.search({
        index: 'products',
        size: 100,
        query: {
          bool:{
            should: [
              {
                query_string: {
                  default_field: 'title',
                  query: '*' + keyword + '*'
                }
              },
              {
                query_string: {
                  default_field: 'content',
                  query: '*' + keyword + '*'
                }
              },
            ]
          }
        },
        sort: [
          {
            createdat: {
              order: 'asc'
            }
          }
        ]
      });
      
      let result = [];

      // 결과를 처리합니다.
      for (const data of datas.hits.hits) {
        result.push(data._source);
      }
      
      res.status(200).json(result)

    } catch (error) {
      next(error, req, res, '상품 검색에 실패하였습니다.');
    }
  };

  // 중고거래 상품 전체 조회 (ELK)
  elkAllProduct = async (req, res, next) => {
    try {
      const keyword = req.query.keyword;
    
      // Elasticsearch에 대한 연결을 만듭니다.
      // host 및 nodes 주소는 배포 환경에 맞는 Elasticsearch 실제 구동 주소로 기입해야 합니다!
      const client = new es.Client({
        host: 'http://localhost:9200',
        nodes: ['http://localhost:9200'],
      });

      // 모든 상품 게시물을 가져옵니다.
      const datas = await client.search({
        index: 'products',
        size: 10000,
        query: {
          match_all: {},
        },
        sort: [
          {
            createdat: {
              order: 'asc'
            }
          }
        ]
      });

      let result = [];

      // 결과를 처리합니다.
      for (const data of datas.hits.hits) {
        result.push(data._source);
      }
      
      res.status(200).json(result)

    } catch (error) {
      next(error, req, res, '상품 검색에 실패하였습니다.');
    }
  };

}

module.exports = ProductsController;
