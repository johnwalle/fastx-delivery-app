import styles from './styles.module.css'

const Spinner = () => {
    return (
        <div className='py-56 flex justify-center items-center'>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Spinner
