import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { useForm, SubmitHandler } from "react-hook-form"
import PortableText from "react-portable-text"
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useState } from "react";
interface Props {
    post: Post
}
interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string
}

const Post = ({ post }: Props) => {
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await fetch("/api/createComment", {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data)
            setSubmitted(true)
        }).catch((err) => {
            console.log(err)
            setSubmitted(false)
        })
    }

    return (
        <main>
            <Header />

            <img className="w-full h-40 object-cover"
                src={urlFor(post.mainImage).url()!}
            />
            <article className="max-w-3xl mx-auto p-5">
                <div className=" flex  border-black-500 justify-center">
                <h1 className="text-4xl  my-10">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-500 mb-2">
                    {post.description}
                </h2>
                </div>

                <div className="flex items-center justify-center space-x-2 border-black-500">
                    <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
                    <p className="font-extralight text-sm">
                        Publicado por <span className="text-green-600">{post.author.name}</span> -
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>

                <div className=' my-10'>
                    <PortableText content={post.body}
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                        serializers={{
                            h1: (props: any) => (
                                <h1 className="text-2xl font-bold my-5" {...props} />
                            ),
                            h2: (props: any) => (
                                <h1 className="text-xl font-bold my-5" {...props} />
                            ),
                            li: ({ children }: any) => (
                                <li className="ml-4 list-disc">{children}</li>
                            ),
                            link: ({ href, children }: any) => (
                                <a href={href} className="text-blue-500 hover:underline">
                                    {children}
                                </a>
                            ),
                            

                        }}
                    />

                </div>

            </article>

            <hr className="max-w-lg my-5 mx-auto border-2 boder-yellow-500" />


            {submitted ? (
                <div className="flex flex-col p-10 my-10 bg-yellow-500">
                    <h3 className="text-2xl font-bold text-white mx-auto"> Obrigado por deixar seu comentário, aguarde aprovação!</h3>
                </div>

            ) : (

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
                    <h3 className="text-sm text-yellow-500"> Gostou do artigo?</h3>
                    <h4 className="text-3xl font-bold">Deixe um comentário abaixo!</h4>
                    <hr className="py-2 mt-2" />

                    <input {...register("_id")} type="hidden" name="_id" value={post._id} />

                    <label className="block mb-5">
                        <span className="text-gray-700">Nome</span>
                        <input {...register("name", { required: true })} type="text" className="shadow border-2 rounded py-2 px-3 form-input mt-1 
                block w-full ring-yellow-500 outile-nome focus:ring" />
                    </label>
                    <label className="block mb-5">
                        <span className="text-gray-700">Email</span>
                        <input {...register("email", { required: true })} type="email" className="shadow border-2 rounded py-2 px-3 form-input mt-1 
                block w-full ring-yellow-500 outile-nome focus:ring" />
                    </label>
                    <label className="block mb-5">
                        <span className="text-gray-700">Comentario</span>
                        <textarea {...register("comment", { required: true })} className="shadow border-2 rounded py-2 px-3 form-textarea mt-1 
                block w-full ring-yellow-500 outile-nome focus:ring" rows={8} />
                    </label>

                    <div className="flex flex-col p-5">
                        {errors.name && (
                            <span className="text-red-500">O nome é obrigatório</span>
                        )}

                        {errors.email && (
                            <span className="text-red-500"> O email é obrigatório</span>
                        )}
                        {errors.comment && (
                            <span className="text-red-500"> Seu comentário deve conter, pelo menos, 1 caracter</span>
                        )}
                    </div>

                    <input type="submit" className="shadow bg-yellow-500 hover: bg-yellow-400 focus:shadow-outline
                    focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"/>
                </form>
            )}

            <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
                <h3 className="text-4xl mx-auto">Comentários</h3>
                <hr className="pb-2" />
                {post.comments.map((comment) => (
                    <div key={comment._id}>
                        <div className=" flex justify-start items-center ">
                            <img className="h-10 w-10 rounded-full " 
                              src={urlFor(post.author.image).url()!} alt="" />
                            <span className="text-yellow-600 mx-2 "> {comment.name}:</span>
                        </div>
                            <p className=" mx-10"> {comment.comment}</p>
                        
                    </div>

                ))}

            </div>


        </main>

    )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type =="post"]{
        _id,
        slug {
            current
        }
    }`;

    const posts = await sanityClient.fetch(query)

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))
    return {
        paths,
        fallback: "blocking"
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type =="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
            name,
            image
        },
        'comments':*[
            _type=="comment" &&
            post._ref == ^._id &&
            approved == true],
            description,
            mainImage,
            slug,
            body
        
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    })

    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post
        },
        revalidate: 60 * 60 
    }
}