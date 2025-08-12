import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DeepSeekService {

    sendMessage(prompt: string): Observable<string> {
        const url = `${environment.apiUrl}/DeepSeek/ChatDeepSeek?prompt=${encodeURIComponent(prompt)}`;
        return new Observable<string>((observer) => {
            fetch(url).then((response) => {
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                const read = () => {
                    reader?.read().then(({ done, value }) => {
                        if (done) {
                            observer.complete();
                            return;
                        }
                        const text = decoder.decode(value, { stream: true });
                        observer.next(text);
                        read();
                    });
                };
                read();
            }).catch((err) => observer.error(err));
        });
    }

}
