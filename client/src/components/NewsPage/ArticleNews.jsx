// TODO: contadorDistribución sirve para que los artículos pares e impares se coloquen de manera distinta

function ArticleNews({countDistribution, title, subtitle, image}) {
    return(
        <article className="bg-white p-8 rounded-lg w-[80%]">
            <div>
                <p className="font-semibold">{title}</p>
                <p>{subtitle}</p>
            </div>
        </article>
    )
}

export default ArticleNews;