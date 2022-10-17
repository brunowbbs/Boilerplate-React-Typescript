import { Api } from "../axios-config";

type ListagemPessoas = {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
};

type DetalhePessoa = {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
};

type PessoasTotalCount = {
  data: ListagemPessoas[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<PessoasTotalCount | Error> => {
  try {
    const relativeURL = `/pessoas?_page=${page}&limit=10&nomeCompleto_like${filter}`;

    const { data, headers } = await Api.get(relativeURL);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || 0),
      };
    }
    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<DetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

    if (data) {
      return data;
    }
    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<DetalhePessoa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<DetalhePessoa>(`/pessoas`, dados);

    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};
const updateById = async (
  id: number,
  dados: DetalhePessoa
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || "Erro ao excluir o registro."
    );
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
