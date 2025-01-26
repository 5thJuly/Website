import React, { useState, useCallback } from 'react';
import {
    TextField,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Alert,
    Snackbar,
    Box,
    InputAdornment
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';

const AnimatedCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
    margin: 'auto',
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[8]
    }
}));

const UrlShortenerWithBitly: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isValidUrl = useCallback((url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }, []);

    const handleShorten = useCallback(async () => {
        setError('');
        setShortUrl('');
        setIsLoading(true);

        if (!isValidUrl(originalUrl)) {
            setError('URL không hợp lệ. Vui lòng kiểm tra lại.');
            setIsLoading(false);
            return;
        }

        try {
            const BITLY_API_TOKEN = 'YOUR_BITLY_API_TOKEN'; // Replace with secure method
            const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${BITLY_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ long_url: originalUrl })
            });

            const data = await response.json();

            if (response.ok && data.link) {
                setShortUrl(data.link);
            } else {
                setError(data.message || 'Không thể rút gọn URL');
            }
        } catch (err) {
            setError('Lỗi kết nối. Vui lòng thử lại.');
            console.error('URL shortening error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [originalUrl, isValidUrl]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(shortUrl).then(
            () => setCopySuccess(true),
            () => setError('Không thể copy URL')
        );
    }, [shortUrl]);

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
            <AnimatedCard>
                <CardHeader
                    title="Rút Gọn URL"
                    titleTypographyProps={{
                        variant: 'h5',
                        align: 'center'
                    }}
                />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Nhập URL dài"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        margin="normal"
                        placeholder="https://example.com/very/long/url"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LinkIcon />
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleShorten}
                        sx={{ mt: 2 }}
                        disabled={!originalUrl.trim() || isLoading}
                        startIcon={isLoading ? <></> : null}
                    >
                        {isLoading ? 'Đang Xử Lý...' : 'Rút Gọn URL'}
                    </Button>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {shortUrl && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" sx={{ wordBreak: 'break-all', mb: 1 }}>
                                URL Rút Gọn: {shortUrl}
                            </Typography>
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<ContentCopyIcon />}
                                onClick={handleCopy}
                            >
                                Sao Chép Liên Kết
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </AnimatedCard>

            <Snackbar
                open={copySuccess}
                autoHideDuration={2000}
                onClose={() => setCopySuccess(false)}
                message="Đã Sao Chép URL"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default UrlShortenerWithBitly;