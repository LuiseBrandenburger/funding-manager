
export default function ShowProjectOverview() {
    return (
        <div className="main-content-right-container">
            <div className="overview"></div>
            <div className="chart-container">
                <form action="">
                    <label htmlFor="single-price">Single Price</label>
                    <input
                        id="single-price"
                        name="single-price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value="25.67"
                    />
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        min="0"
                        step="1"
                        value="3"
                    />
                    <button className="add-position-btn">Add</button>
                </form>
            </div>
            <div className="chart-container"></div>
        </div>
    );
}
