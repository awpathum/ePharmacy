package com.awpathum.pharmacy.classes;


public class StockResponse {


    private String id;

    private String drugName;

    private Integer quantity;

    private String manDate;

    private String resDate;

    private String expDate;

    private String supplier;

    private String supplierId;

    private String drug;

    private String drugId;

    public StockResponse(String id, String drugName, Integer quantity, String manDate, String resDate, String expDate, String supplier, String supplierId, String drug, String drugId) {
        this.id = id;
        this.drugName = drugName;
        this.quantity = quantity;
        this.manDate = manDate;
        this.resDate = resDate;
        this.expDate = expDate;
        this.supplier = supplier;
        this.supplierId = supplierId;
        this.drug = drug;
        this.drugId = drugId;
    }

    public String getDrug() {
        return drug;
    }

    public void setDrug(String drug) {
        this.drug = drug;
    }

    public String getDrugId() {
        return drugId;
    }

    public void setDrugId(String drugId) {
        this.drugId = drugId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getManDate() {
        return manDate;
    }

    public void setManDate(String manDate) {
        this.manDate = manDate;
    }

    public String getResDate() {
        return resDate;
    }

    public void setResDate(String resDate) {
        this.resDate = resDate;
    }

    public String getExpDate() {
        return expDate;
    }

    public void setExpDate(String expDate) {
        this.expDate = expDate;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }


}
