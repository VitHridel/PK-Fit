import { ChildrenInterface } from '@/global.interface'
import { Main } from './layout.styles'
import { Header } from '@/components/Layout/Header/Header'
import { Footer } from '@/components/Layout/Footer'

export const Layout = ({ children }: ChildrenInterface) => {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    )
}