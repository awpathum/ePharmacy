package com.awpathum.pharmacy.classes;

public class BillDrugQuantity {

    private String billId;

    private String drugId;

    private Integer quantity;

    public String getBillId() {
        return billId;
    }

    public void setBillId(String billId) {
        this.billId = billId;
    }

    public String getDrugId() {
        return drugId;
    }

    public void setDrugId(String drugId) {
        this.drugId = drugId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BillDrugQuantity(String billId, String drugId, Integer quantity) {
        this.billId = billId;
        this.drugId = drugId;
        this.quantity = quantity;
    }
}
