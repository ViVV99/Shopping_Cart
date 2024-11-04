import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <h2 className="navbar-brand h1 mb-0">Supermercado Online</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light mt-0"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Produto({ produto, adicionarAoCarrinho }) {
  return (
    <div
      className={`card produto-card ${produto.promocao && "border-danger"} `}
      style={{ width: "15rem" }}
    >
      <img
        className="card-img-top h-50"
        src={produto.imagem}
        alt={produto.nome}
      />
      <div>
        {produto.promocao && (
          <motion.p
            className="card-text text-danger text-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 0.15,
              duration: 0.8,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            Promoção!!
          </motion.p>
        )}
        <p className="card-text text-center text-muted">
          {produto.promocao && "10% de desconto"}
        </p>
      </div>
      <div className="card-body text-center">
        <h3 className="card-title">{produto.nome}</h3>
        <p className="card-text ">
          {!produto.promocao ? (
            `R$ ${produto.preco.toFixed(2)}`
          ) : (
            <>
              <span className="text-muted text-decoration-line-through">
                {`R$ ${produto.preco.toFixed(2)}`}{" "}
              </span>
              <span
                style={{ display: "inline-block" }}
                key={produto.id}
                className="fs-5 text-danger text-center fw-bold"
              >
                {` R$ ${produto.calcularPrecoPromo().toFixed(2)}`}
              </span>
            </>
          )}
        </p>
        <p className="card-text">Validade: {produto.validade}</p>
        <p className="card-text">
          Corredor: {produto.corredor} | Gôndola: {produto.gondola}
        </p>
      </div>
      <div
        className="card-footer"
        style={{
          background: "transparent",
          borderTop: "none",
        }}
      >
        <button
          className="btn btn-primary w-100"
          onClick={() => adicionarAoCarrinho(produto)}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

function CarrinhoModal({ carrinho, removerDoCarrinho, editarCarrinho }) {
  const calcularTotal = () => {
    return carrinho
      .reduce((total, item) => {
        if (item.promocao) return total + item.calcularPrecoPromo() * item.qnt;
        return total + item.preco * item.qnt;
      }, 0)
      .toFixed(2);
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Carrinho
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div>
          <h2>Carrinho de Compras</h2>
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              {carrinho.map((item, index) => (
                <div key={index} className="d-flex align-items-center">
                  <p className="d-flex align-items-center mb-0">
                    {item.nome} - R$ &nbsp;
                    <input
                      className="form-control w-25 m-1"
                      id={item.id}
                      onChange={(e) => {
                        if (!e.target.value) return removerDoCarrinho(index);

                        editarCarrinho(item, e.target.value);
                      }}
                      value={item.qnt}
                    />
                    {item.promocao
                      ? item.calcularPrecoPromo().toFixed(2)
                      : item.preco.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-outline-danger mt-0"
                    onClick={() => removerDoCarrinho(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
              <h3>Total: R${calcularTotal()}</h3> {/* Mostra o preço total */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Promocoes() {
  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    setPromocoes([{ id: 2, descricao: "10% de desconto em frutas frescas." }]);
  }, []);

  return (
    <div className="promocoes float-end">
      <h2>Oportunidades de Promoção</h2>
      <ul>
        {promocoes.map((promo) => (
          <li key={promo.id}>{promo.descricao}</li>
        ))}
      </ul>
    </div>
  );
}

// function calcularPrecoPromo(item) {
//   return item.preco - item.preco * item.fatorPromo;
// }

export default function App() {
  const [produtos, setProdutos] = useState([
    {
      nome: "Maçã",
      preco: 2.99,
      validade: "15/10/2024",
      corredor: 4,
      gondola: 2,
      imagem:
        "https://hortifruti.com.br/media/catalog/product/cache/90a67334732b2408839e146d4f241496/1/0/100171-maca-red-unidade.jpg",
      promocao: true,
      tipoPromo: "descontounitario",
      calcularPrecoPromo() {
        return this.preco - this.preco * this.fatorPromo;
      },
      fatorPromo: 0.1,
    },
    {
      nome: "Leite",
      preco: 4.59,
      validade: "10/11/2024",
      corredor: 7,
      gondola: 3,
      imagem:
        "https://ibassets.com.br/ib.item.image.large/l-c54acdc6d1da4f50a37252efe847bbd7.jpeg",
      promocao: false,
    },
    {
      nome: "Arroz",
      preco: 18.99,
      validade: "20/12/2024",
      corredor: 5,
      gondola: 1,
      imagem:
        "https://mercantilnovaera.vtexassets.com/arquivos/ids/195127-800-auto?v=637789075399570000&width=800&height=auto&aspect=true",
      promocao: false,
    },
    {
      nome: "Banana",
      preco: 3.49,
      validade: "12/10/2024",
      corredor: 4,
      gondola: 2,
      imagem: "https://thumbs.dreamstime.com/b/grupo-das-bananas-6175887.jpg",
      promocao: true,
      tipoPromo: "descontounitario",
      calcularPrecoPromo() {
        return this.preco - this.preco * this.fatorPromo;
      },
      fatorPromo: 0.1,
    },
  ]);

  const [carrinho, setCarrinho] = useState([]);

  const [toastData, setToastData] = useState({
    visible: false,
    message: "",
  });

  const adicionarAoCarrinho = (produto) => {
    if (carrinho.some((item) => item.nome === produto.nome)) {
      const carrinhoAtualizado = carrinho.map((item) => {
        if (item.nome === produto.nome) {
          const newProduto = { ...produto, qnt: item.qnt + 1 };
          return newProduto;
        }
        return item;
      });
      setCarrinho([...carrinhoAtualizado]);
    } else {
      setCarrinho([...carrinho, { ...produto, qnt: 1 }]);
    }

    setToastData({ message: "Item adicionado ao carrinho!", visible: true });
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
    setToastData({ message: "Item removido do carrinho!", visible: true });
  };

  const editarCarrinho = (item, value) => {
    const numberRegex = /^[0-9]*$/;
    if (!numberRegex.test(value)) {
      return;
    }

    const novoCarrinho = carrinho.map((carrinhoItem) => {
      if (carrinhoItem.nome === item.nome) {
        carrinhoItem.qnt = parseInt(value);
      }
      return carrinhoItem;
    });
    setCarrinho([...novoCarrinho]);
    setToastData({ message: "Item editado no carrinho!", visible: true });
  };

  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(
        () => setToastData({ ...toastData, visible: true }),
        4000
      );
      return () => clearTimeout(timer); // Limpa o timer ao desmontar ou reiniciar
    }
  }, [carrinho, toastData]); // Roda o efeito a cada alteração no carrinho

  return (
    <>
      <Header />
      <Promocoes />
      <CarrinhoModal
        carrinho={carrinho}
        removerDoCarrinho={removerDoCarrinho}
        editarCarrinho={editarCarrinho}
      />
      <div className="app ">
        <h2 className="fw-semibold">Produtos</h2>
        <div className="d-flex align-items-center h-100 gap-3">
          {produtos.map((produto, index) => (
            <Produto
              key={index}
              produto={produto}
              adicionarAoCarrinho={adicionarAoCarrinho}
            />
          ))}
        </div>
      </div>
      {toastData.visible && (
        <div
          className={`toast-container position-fixed top-0 end-0 p-3`}
          style={{ zIndex: 1050 }}
        >
          <div className="toast align-items-center text-bg-primary border-0 show">
            <div className="d-flex">
              <div className="toast-body">{toastData.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setToastData({ ...toastData, visible: false })}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
