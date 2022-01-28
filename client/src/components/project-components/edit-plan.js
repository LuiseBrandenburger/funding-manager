

export default function EditPlan() {


    
    return (
        <div className="main-content-right-container">
            <div className="edit-project-container">
                <h3>You can add Positions to your Project Plan here:</h3>
                <div className="project-plan-outgoings">
                    <h2>OUTGOINGS</h2>
                    <form action="">
                        <div className="edit-plan-form-top">
                            <div className="group-container">
                                <label htmlFor="category">
                                    Select Item Category
                                </label>
                                <select name="category" id="category">
                                    <option value="hide">-- Category --</option>
                                    <option value="Production">
                                        Production
                                    </option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Tour">Tour</option>
                                </select>
                            </div>

                            <div className="option">
                                <label htmlFor="option">Select Option</label>
                                <select name="option" id="option">
                                    <option value="hide">
                                        -- Expense Category --
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="position">Item Name</label>
                                <input
                                    type="text"
                                    id="position"
                                    placeholder="Describe Position"
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Item Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    placeholder="1000,00"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    placeholder="1"
                                    step="1"
                                />
                            </div>
                            <div>
                                <label htmlFor="paid">Paid?</label>
                                <input type="checkbox" id="paid" />
                            </div>
                        </div>

                        <div className="edit-plan-form-bottom">
                            <div>
                                <label htmlFor="paiddate">
                                    Date of Payment
                                </label>
                                <input type="date" id="paiddate" />
                            </div>

                            <div>
                                <label htmlFor="finalsum">Paid Amount</label>
                                <input
                                    type="number"
                                    id="finalsum"
                                    placeholder="10.000,00"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="notes">
                                    Notes on Payment
                                </label>
                                <input
                                    type="text"
                                    id="notes"
                                    placeholder="Please enter Notes"
                                />
                            </div>

                            <div>
                                <label
                                    className="file-label"
                                    htmlFor="file"
                                >
                                    <img src="/upload-btn.svg" alt="" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    title="upload file here"
                                />
                            </div>
                        </div>

                        <div className="single-position-costs">
                            <span>
                                TOTAL:
                                <span>0,00 €</span>
                            </span>
                            <button className="add-btn">
                                <img src="/add-btn.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="project-plan-income">
                    <h2>INCOME</h2>

                    <form action="">
                        <div className="edit-plan-form-top">
                            <div className="group-container">
                                <label htmlFor="selection-group">
                                    Select Item Category
                                </label>
                                <select
                                    name="selection-group"
                                    id="selection-group"
                                >
                                    <option value="hide">-- Category --</option>
                                    <option value="Production">
                                        Production
                                    </option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Tour">Tour</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="item-name">Item Name</label>
                                <input
                                    type="text"
                                    id="item-name"
                                    placeholder="Describe Position"
                                />
                            </div>

                            <div>
                                <label htmlFor="item-price">Item Price</label>
                                <input
                                    type="number"
                                    id="item-price"
                                    placeholder="10.000,00"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="item-paid">Paid?</label>
                                <input type="checkbox" id="item-paid" />
                            </div>
                        </div>

                        <div className="edit-plan-form-bottom">
                            <div>
                                <label htmlFor="item-paid-date">
                                    Date of Payment
                                </label>
                                <input type="date" id="item-paid-date" />
                            </div>

                            <div>
                                <label htmlFor="final-price">Paid Amount</label>
                                <input
                                    type="number"
                                    id="final-price"
                                    placeholder="10.000,00"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="final-position-description">
                                    Notes on Payment
                                </label>
                                <input
                                    type="text"
                                    id="final-position-description"
                                    placeholder="Please enter Notes"
                                />
                            </div>

                            <div>
                                <label
                                    className="file-label"
                                    htmlFor="item-file"
                                >
                                    <img src="/upload-btn.svg" alt="" />
                                </label>
                                <input
                                    type="file"
                                    id="item-file"
                                    title="upload file here"
                                />
                            </div>
                        </div>

                        <div className="single-position-costs">
                            <span>
                                TOTAL:
                                <span>0,00 €</span>
                            </span>
                            <button className="add-btn income">
                                <img src="/add-btn.svg" alt="" />
                            </button>
                        </div>
                    </form>

                    <button className="submit-btn">Show Table</button>
                </div>
            </div>
        </div>
    );
}
