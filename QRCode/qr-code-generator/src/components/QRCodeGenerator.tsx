import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box,
  Slide,
  Zoom
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from '@mui/material/styles';

interface QRCodeGeneratorProps {
  defaultUrl?: string;
}

const AnimatedCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[6],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[12]
  }
}));

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  defaultUrl = '' 
}) => {
  const [url, setUrl] = useState<string>(defaultUrl);
  const [qrSize, setQrSize] = useState<number>(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = qrSize;
        canvas.height = qrSize;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <AnimatedCard>
      <CardHeader 
        title="QR Code Generator" 
        sx={{ 
          textAlign: 'center', 
          backgroundColor: 'primary.light', 
          color: 'primary.contrastText' 
        }} 
      />
      <CardContent>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <TextField 
            fullWidth
            label="Enter URL or Text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 2 
              } 
            }}
          />
        </Slide>
        
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <FormControl fullWidth>
            <InputLabel>QR Code Size</InputLabel>
            <Select
              value={qrSize}
              label="QR Code Size"
              onChange={(e) => setQrSize(Number(e.target.value))}
            >
              {[128, 256, 512].map(size => (
                <MenuItem key={size} value={size}>
                  {size}x{size} px
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Error Correction</InputLabel>
            <Select
              value={errorLevel}
              label="Error Correction"
              onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            >
              <MenuItem value="L">Low</MenuItem>
              <MenuItem value="M">Medium</MenuItem>
              <MenuItem value="Q">Quality</MenuItem>
              <MenuItem value="H">High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {url && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              mt: 3 
            }}
          >
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
              <div ref={qrRef}>
                <QRCodeSVG 
                  value={url} 
                  size={qrSize}
                  level={errorLevel}
                />
              </div>
            </Zoom>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{ 
                mt: 2, 
                px: 3, 
                py: 1, 
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Download QR Code
            </Button>
          </Box>
        )}
      </CardContent>
    </AnimatedCard>
  );
};

export default QRCodeGenerator;