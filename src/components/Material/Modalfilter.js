import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
};

export default function FilterModal({ open, onClose, onApply }) {
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState({ male: true, female: true });
  const [status, setStatus] = useState({ done: true, pending: true, canceled: true });
  const [vet, setVet] = useState("");
  const [city, setCity] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleApply = () => {
    onApply({
      category,
      breed,
      gender,
      status,
      vet,
      city,
      dateFrom,
      dateTo,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>فیلتر ملاقات‌ها</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>دسته بندی</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="">همه</MenuItem>
                <MenuItem value="dog">سگ</MenuItem>
                <MenuItem value="cat">گربه</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>نژاد</InputLabel>
              <Select value={breed} onChange={(e) => setBreed(e.target.value)}>
                <MenuItem value="">همه</MenuItem>
                <MenuItem value="bulldog">بولداگ</MenuItem>
                <MenuItem value="persian">پرشین</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender.male}
                  onChange={(e) => setGender({ ...gender, male: e.target.checked })}
                />
              }
              label="نر"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={gender.female}
                  onChange={(e) => setGender({ ...gender, female: e.target.checked })}
                />
              }
              label="ماده"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={status.done}
                  onChange={(e) => setStatus({ ...status, done: e.target.checked })}
                />
              }
              label="انجام شده"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={status.pending}
                  onChange={(e) => setStatus({ ...status, pending: e.target.checked })}
                />
              }
              label="در انتظار"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={status.canceled}
                  onChange={(e) => setStatus({ ...status, canceled: e.target.checked })}
                />
              }
              label="لغو شده"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="دامپزشک"
              value={vet}
              onChange={(e) => setVet(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="شهر"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="از تاریخ"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="تا تاریخ"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>لغو</Button>
          <Button variant="contained" color="primary" onClick={handleApply}>اعمال فیلتر</Button>
        </Box>
      </Box>
    </Modal>
  );
}
