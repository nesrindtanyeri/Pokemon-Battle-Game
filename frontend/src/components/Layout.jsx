import outlet from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <main>
                <outlet />
            </main>
        </div>
    )
}

export default Layout