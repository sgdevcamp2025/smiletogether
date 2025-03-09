package com.smiletogether.chatserver.infrastructure;

import com.smiletogether.chatserver.dto.WorkspaceProfileDto;

import java.net.URI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.*;


@Component
@Slf4j
public class ExternalProfileApiClient {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${external-api.space-server}")
    private String spaceServerUrl;

    public WorkspaceProfileDto getWorkspaceProfile(String token, String workspaceId, String memberId) {
        log.info("🔎 Fetching workspace profile for workspaceId={}, memberId={}", workspaceId, memberId);

        URI uri = UriComponentsBuilder
                .fromUriString(spaceServerUrl)
                .pathSegment("workspaces", workspaceId, "users", memberId)
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        log.info("🔗 Calling external API: {}", uri);

        try {
            ResponseEntity<ExternalProfileResponse> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    requestEntity,
                    ExternalProfileResponse.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("✅ Successfully fetched workspace profile: {}", response.getBody());

                return WorkspaceProfileDto.of(response.getBody());
            } else {
                log.error("❌ Failed to fetch workspace profile. Status: {}, Body: {}", response.getStatusCode(), response.getBody());
            }
        } catch (Exception e) {
            log.error("❌ Error calling external API: {}", e.getMessage(), e);
        }

        return null;
    }
}