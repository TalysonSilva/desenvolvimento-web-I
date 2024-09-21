//import index from 'index.css';
import React from "react";
import { useEffect, useRef } from "react";
//useForm é um hook que ajuda a lidar com formulários em React
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; //yupResolver é um pacote que permite usar Yup como validador para react-hook-form
//Yup é uma biblioteca de validação de esquema JavaScript
import { object, string } from "yup";

//Criando um esquema de validação com Yup
const schema = object({
  name: string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 4 caracteres"),
  email: string()
    .email("Email digitado não é valido")
    .required("Email é obrigatório"),
  message: string()
    .required("Mensagem é obrigatória")
    .max(250, "Mensagem deve ter no máximo 250 caracteres"),
});

//Criando um componente de formulário de contato
export default function ContactForm() {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Referência para o elemento textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //Ajustar a altura do textarea conforme o conteúdo
  useEffect(() => {
    const textarea = textareaRef.current; // Obter o elemento textarea

    if (textarea) {
      // Se o elemento textarea existir
      textarea.style.height = "auto"; // Resetar a altura para recalcular
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a altura com base no conteúdo
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // Resetar a altura para recalcular
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar com base no conteúdo
  };

  //Função que é chamada quando o formulário é enviado
  const handleSubmit = (data: object) => {
    console.log(data);
    //Envia os dados do formulário para um servidor
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {" "}
        Formulario de contato{" "}
      </h1>
      <form onSubmit={onSubmit(handleSubmit)}>
        <div className="mb-7">
          <label className="block text-sm font-medium " htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name")} //
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-7">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-7">
          <label htmlFor="message" className="block text-sm font-medium">
            Message:
          </label>
          <textarea
            id="message"
            {...register("message")}
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
            onInput={handleInput} // Ajustar a altura do textarea conforme o conteúdo
            style={{ overflow: "hidden" }} // Ocultar barras de rolagem
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
