import livro from "../models/livro.js";
import { autor } from "../models/Autor.js";
class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({}); //find encontrar todos os livros
      res.status(200).json(listaLivros);
    } catch (error) {
      res
        .status(500)
        .json({ message: `falha na requisição: ${error.message}` });
    }
  }

  static async listarLivrosPorId(req, res) {
    try {
      const id = req.params.id;
      const livrosEncontrado = await livro.findById(id); //findbyid encontrar livro por id
      res.status(200).json(livrosEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `falha na requisição: ${error.message}` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body); //findByIdAndUpdate atualiza o livro
      res.status(200).json({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `falha na atualização ${error.message}` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc} };
      const livroCriado = await livro.create(livroCompleto);
        res.status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao cadastrar o livro: ${error.message}` });
    }
  }

  static async deletarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).send("livro deletado com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `falha ao apagar livro: ${error.message}` });
    }
  }

  static async listarLivrosPorAutor(req, res) {
    const autor = req.query.autor;
    try{
      const livroPorAutor = await livro.find({nome: autor});
      res.status(200).json(livroPorAutor);
    }catch(error){
      res.status(500).json({message: `falha na requisição: ${error.message}`});
    }
  }

}

export default LivroController;
