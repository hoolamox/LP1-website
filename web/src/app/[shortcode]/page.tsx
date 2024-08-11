type PageProps = {
    params: { shortcode: string }
}

export default function Page({ params }: PageProps) {
    return <div>{params.shortcode}</div>
}