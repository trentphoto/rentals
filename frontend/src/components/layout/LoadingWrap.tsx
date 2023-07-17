import Layout from "./Layout"
import Seo from "../Seo"

function LoadingWrap({ children }: { children: React.ReactNode }){
    return (
        <>
            <Layout>
                <Seo />
                <div className="container">
                    <div className="flex justify-center items-center h-screen">
                        { children }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default LoadingWrap