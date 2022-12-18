import './app-info.css';

const AppInfo = (props) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании "Рога и Копыта"</h1>
            <h2>Общее число сотрудников: {props.totalImployees}</h2>
            <h2>Премию получат: {props.getSalary}</h2>
        </div>
    )
}

export default AppInfo;